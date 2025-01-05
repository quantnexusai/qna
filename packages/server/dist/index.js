"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
exports.getAllChatFlow = getAllChatFlow;
exports.start = start;
exports.getInstance = getInstance;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const socket_io_1 = require("socket.io");
const utils_1 = require("./utils");
const logger_1 = __importStar(require("./utils/logger"));
const DataSource_1 = require("./DataSource");
const NodesPool_1 = require("./NodesPool");
const ChatFlow_1 = require("./database/entities/ChatFlow");
const ChatflowPool_1 = require("./ChatflowPool");
const CachePool_1 = require("./CachePool");
const rateLimit_1 = require("./utils/rateLimit");
const apiKey_1 = require("./utils/apiKey");
const XSS_1 = require("./utils/XSS");
const telemetry_1 = require("./utils/telemetry");
const routes_1 = __importDefault(require("./routes"));
const errors_1 = __importDefault(require("./middlewares/errors"));
const SSEStreamer_1 = require("./utils/SSEStreamer");
const validateKey_1 = require("./utils/validateKey");
const Prometheus_1 = require("./metrics/Prometheus");
const OpenTelemetry_1 = require("./metrics/OpenTelemetry");
require("global-agent/bootstrap");
class App {
    constructor() {
        this.AppDataSource = (0, DataSource_1.getDataSource)();
        this.app = (0, express_1.default)();
    }
    async initDatabase() {
        // Initialize database
        try {
            await this.AppDataSource.initialize();
            logger_1.default.info('📦 [server]: Data Source is initializing...');
            // Run Migrations Scripts
            await this.AppDataSource.runMigrations({ transaction: 'each' });
            // Initialize nodes pool
            this.nodesPool = new NodesPool_1.NodesPool();
            await this.nodesPool.initialize();
            // Initialize chatflow pool
            this.chatflowPool = new ChatflowPool_1.ChatflowPool();
            // Initialize API keys
            await (0, apiKey_1.getAPIKeys)();
            // Initialize encryption key
            await (0, utils_1.getEncryptionKey)();
            // Initialize Rate Limit
            const AllChatFlow = await getAllChatFlow();
            await (0, rateLimit_1.initializeRateLimiter)(AllChatFlow);
            // Initialize cache pool
            this.cachePool = new CachePool_1.CachePool();
            // Initialize telemetry
            this.telemetry = new telemetry_1.Telemetry();
            logger_1.default.info('📦 [server]: Data Source has been initialized!');
        }
        catch (error) {
            logger_1.default.error('❌ [server]: Error during Data Source initialization:', error);
        }
    }
    async config(socketIO) {
        // Limit is needed to allow sending/receiving base64 encoded string
        const flowise_file_size_limit = process.env.FLOWISE_FILE_SIZE_LIMIT || '50mb';
        this.app.use(express_1.default.json({ limit: flowise_file_size_limit }));
        this.app.use(express_1.default.urlencoded({ limit: flowise_file_size_limit, extended: true }));
        if (process.env.NUMBER_OF_PROXIES && parseInt(process.env.NUMBER_OF_PROXIES) > 0)
            this.app.set('trust proxy', parseInt(process.env.NUMBER_OF_PROXIES));
        // Allow access from specified domains
        this.app.use((0, cors_1.default)((0, XSS_1.getCorsOptions)()));
        // Allow embedding from specified domains.
        this.app.use((req, res, next) => {
            const allowedOrigins = (0, XSS_1.getAllowedIframeOrigins)();
            if (allowedOrigins == '*') {
                next();
            }
            else {
                const csp = `frame-ancestors ${allowedOrigins}`;
                res.setHeader('Content-Security-Policy', csp);
                next();
            }
        });
        // Switch off the default 'X-Powered-By: Express' header
        this.app.disable('x-powered-by');
        // Add the expressRequestLogger middleware to log all requests
        this.app.use(logger_1.expressRequestLogger);
        // Add the sanitizeMiddleware to guard against XSS
        this.app.use(XSS_1.sanitizeMiddleware);
        // Make io accessible to our router on req.io
        this.app.use((req, res, next) => {
            req.io = socketIO;
            next();
        });
        const whitelistURLs = [
            '/api/v1/verify/apikey/',
            '/api/v1/chatflows/apikey/',
            '/api/v1/public-chatflows',
            '/api/v1/public-chatbotConfig',
            '/api/v1/prediction/',
            '/api/v1/vector/upsert/',
            '/api/v1/node-icon/',
            '/api/v1/components-credentials-icon/',
            '/api/v1/chatflows-streaming',
            '/api/v1/chatflows-uploads',
            '/api/v1/openai-assistants-file/download',
            '/api/v1/feedback',
            '/api/v1/leads',
            '/api/v1/get-upload-file',
            '/api/v1/ip',
            '/api/v1/ping',
            '/api/v1/version',
            '/api/v1/attachments',
            '/api/v1/metrics'
        ];
        const URL_CASE_INSENSITIVE_REGEX = /\/api\/v1\//i;
        const URL_CASE_SENSITIVE_REGEX = /\/api\/v1\//;
        if (process.env.FLOWISE_USERNAME && process.env.FLOWISE_PASSWORD) {
            const username = process.env.FLOWISE_USERNAME;
            const password = process.env.FLOWISE_PASSWORD;
            const basicAuthMiddleware = (0, express_basic_auth_1.default)({
                users: { [username]: password }
            });
            this.app.use(async (req, res, next) => {
                // Step 1: Check if the req path contains /api/v1 regardless of case
                if (URL_CASE_INSENSITIVE_REGEX.test(req.path)) {
                    // Step 2: Check if the req path is case sensitive
                    if (URL_CASE_SENSITIVE_REGEX.test(req.path)) {
                        // Step 3: Check if the req path is in the whitelist
                        const isWhitelisted = whitelistURLs.some((url) => req.path.startsWith(url));
                        if (isWhitelisted) {
                            next();
                        }
                        else if (req.headers['x-request-from'] === 'internal') {
                            basicAuthMiddleware(req, res, next);
                        }
                        else {
                            const isKeyValidated = await (0, validateKey_1.validateAPIKey)(req);
                            if (!isKeyValidated) {
                                return res.status(401).json({ error: 'Unauthorized Access' });
                            }
                            next();
                        }
                    }
                    else {
                        return res.status(401).json({ error: 'Unauthorized Access' });
                    }
                }
                else {
                    // If the req path does not contain /api/v1, then allow the request to pass through, example: /assets, /canvas
                    next();
                }
            });
        }
        else {
            this.app.use(async (req, res, next) => {
                // Step 1: Check if the req path contains /api/v1 regardless of case
                if (URL_CASE_INSENSITIVE_REGEX.test(req.path)) {
                    // Step 2: Check if the req path is case sensitive
                    if (URL_CASE_SENSITIVE_REGEX.test(req.path)) {
                        // Step 3: Check if the req path is in the whitelist
                        const isWhitelisted = whitelistURLs.some((url) => req.path.startsWith(url));
                        if (isWhitelisted) {
                            next();
                        }
                        else if (req.headers['x-request-from'] === 'internal') {
                            next();
                        }
                        else {
                            const isKeyValidated = await (0, validateKey_1.validateAPIKey)(req);
                            if (!isKeyValidated) {
                                return res.status(401).json({ error: 'Unauthorized Access' });
                            }
                            next();
                        }
                    }
                    else {
                        return res.status(401).json({ error: 'Unauthorized Access' });
                    }
                }
                else {
                    // If the req path does not contain /api/v1, then allow the request to pass through, example: /assets, /canvas
                    next();
                }
            });
        }
        if (process.env.ENABLE_METRICS === 'true') {
            switch (process.env.METRICS_PROVIDER) {
                // default to prometheus
                case 'prometheus':
                case undefined:
                    this.metricsProvider = new Prometheus_1.Prometheus(this.app);
                    break;
                case 'open_telemetry':
                    this.metricsProvider = new OpenTelemetry_1.OpenTelemetry(this.app);
                    break;
                // add more cases for other metrics providers here
            }
            if (this.metricsProvider) {
                await this.metricsProvider.initializeCounters();
                logger_1.default.info(`📊 [server]: Metrics Provider [${this.metricsProvider.getName()}] has been initialized!`);
            }
            else {
                logger_1.default.error("❌ [server]: Metrics collection is enabled, but failed to initialize provider (valid values are 'prometheus' or 'open_telemetry'.");
            }
        }
        this.app.use('/api/v1', routes_1.default);
        this.sseStreamer = new SSEStreamer_1.SSEStreamer(this.app);
        // ----------------------------------------
        // Configure number of proxies in Host Environment
        // ----------------------------------------
        this.app.get('/api/v1/ip', (request, response) => {
            response.send({
                ip: request.ip,
                msg: 'Check returned IP address in the response. If it matches your current IP address ( which you can get by going to http://ip.nfriedly.com/ or https://api.ipify.org/ ), then the number of proxies is correct and the rate limiter should now work correctly. If not, increase the number of proxies by 1 and restart Cloud-Hosted Flowise until the IP address matches your own. Visit https://docs.flowiseai.com/configuration/rate-limit#cloud-hosted-rate-limit-setup-guide for more information.'
            });
        });
        // ----------------------------------------
        // Serve UI static
        // ----------------------------------------
        const packagePath = (0, utils_1.getNodeModulesPackagePath)('flowise-ui');
        const uiBuildPath = path_1.default.join(packagePath, 'build');
        const uiHtmlPath = path_1.default.join(packagePath, 'build', 'index.html');
        this.app.use('/', express_1.default.static(uiBuildPath));
        // All other requests not handled will return React app
        this.app.use((req, res) => {
            res.sendFile(uiHtmlPath);
        });
        // Error handling
        this.app.use(errors_1.default);
    }
    async stopApp() {
        try {
            const removePromises = [];
            removePromises.push(this.telemetry.flush());
            await Promise.all(removePromises);
        }
        catch (e) {
            logger_1.default.error(`❌[server]: Flowise Server shut down error: ${e}`);
        }
    }
}
exports.App = App;
let serverApp;
async function getAllChatFlow() {
    return await (0, DataSource_1.getDataSource)().getRepository(ChatFlow_1.ChatFlow).find();
}
async function start() {
    serverApp = new App();
    const host = process.env.HOST;
    const port = parseInt(process.env.PORT || '', 10) || 3000;
    const server = http_1.default.createServer(serverApp.app);
    const io = new socket_io_1.Server(server, {
        cors: (0, XSS_1.getCorsOptions)()
    });
    await serverApp.initDatabase();
    await serverApp.config(io);
    server.listen(port, host, () => {
        logger_1.default.info(`⚡️ [server]: Flowise Server is listening at ${host ? 'http://' + host : ''}:${port}`);
    });
}
function getInstance() {
    return serverApp;
}
//# sourceMappingURL=index.js.map