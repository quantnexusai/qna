"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const documents_1 = require("@langchain/core/documents");
const base_1 = require("langchain/document_loaders/base");
const utils_1 = require("../../../src/utils");
const axios_1 = __importDefault(require("axios"));
const zod_1 = require("zod");
const zod_to_json_schema_1 = require("zod-to-json-schema");
// FirecrawlApp class (not exported)
class FirecrawlApp {
    constructor({ apiKey = null, apiUrl = null }) {
        this.apiKey = apiKey || '';
        this.apiUrl = apiUrl || 'https://api.firecrawl.dev';
        if (!this.apiKey) {
            throw new Error('No API key provided');
        }
    }
    async scrapeUrl(url, params = null) {
        const headers = this.prepareHeaders();
        let jsonData = { url, ...params };
        if (params?.extractorOptions?.extractionSchema) {
            let schema = params.extractorOptions.extractionSchema;
            if (schema instanceof zod_1.z.ZodSchema) {
                schema = (0, zod_to_json_schema_1.zodToJsonSchema)(schema);
            }
            jsonData = {
                ...jsonData,
                extractorOptions: {
                    ...params.extractorOptions,
                    extractionSchema: schema,
                    mode: params.extractorOptions.mode || 'llm-extraction'
                }
            };
        }
        try {
            const response = await this.postRequest(this.apiUrl + '/v0/scrape', jsonData, headers);
            if (response.status === 200) {
                const responseData = response.data;
                if (responseData.success) {
                    return responseData;
                }
                else {
                    throw new Error(`Failed to scrape URL. Error: ${responseData.error}`);
                }
            }
            else {
                this.handleError(response, 'scrape URL');
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
        return { success: false, error: 'Internal server error.' };
    }
    async crawlUrl(url, params = null, waitUntilDone = true, pollInterval = 2, idempotencyKey) {
        const headers = this.prepareHeaders(idempotencyKey);
        let jsonData = { url, ...params };
        try {
            const response = await this.postRequest(this.apiUrl + '/v0/crawl', jsonData, headers);
            if (response.status === 200) {
                const jobId = response.data.jobId;
                if (waitUntilDone) {
                    return this.monitorJobStatus(jobId, headers, pollInterval);
                }
                else {
                    return { success: true, jobId };
                }
            }
            else {
                this.handleError(response, 'start crawl job');
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
        return { success: false, error: 'Internal server error.' };
    }
    prepareHeaders(idempotencyKey) {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
            ...(idempotencyKey ? { 'x-idempotency-key': idempotencyKey } : {})
        };
    }
    postRequest(url, data, headers) {
        return axios_1.default.post(url, data, { headers });
    }
    getRequest(url, headers) {
        return axios_1.default.get(url, { headers });
    }
    async monitorJobStatus(jobId, headers, checkInterval) {
        let isJobCompleted = false;
        while (!isJobCompleted) {
            const statusResponse = await this.getRequest(this.apiUrl + `/v0/crawl/status/${jobId}`, headers);
            if (statusResponse.status === 200) {
                const statusData = statusResponse.data;
                switch (statusData.status) {
                    case 'completed':
                        isJobCompleted = true;
                        if ('data' in statusData) {
                            return statusData.data;
                        }
                        else {
                            throw new Error('Crawl job completed but no data was returned');
                        }
                    case 'active':
                    case 'paused':
                    case 'pending':
                    case 'queued':
                        await new Promise((resolve) => setTimeout(resolve, Math.max(checkInterval, 2) * 1000));
                        break;
                    default:
                        throw new Error(`Crawl job failed or was stopped. Status: ${statusData.status}`);
                }
            }
            else {
                this.handleError(statusResponse, 'check crawl status');
            }
        }
    }
    handleError(response, action) {
        if ([402, 408, 409, 500].includes(response.status)) {
            const errorMessage = response.data.error || 'Unknown error occurred';
            throw new Error(`Failed to ${action}. Status code: ${response.status}. Error: ${errorMessage}`);
        }
        else {
            throw new Error(`Unexpected error occurred while trying to ${action}. Status code: ${response.status}`);
        }
    }
}
class FireCrawlLoader extends base_1.BaseDocumentLoader {
    constructor(loaderParams) {
        super();
        const { apiKey, apiUrl, url, mode = 'crawl', params } = loaderParams;
        if (!apiKey) {
            throw new Error('Firecrawl API key not set. You can set it as FIRECRAWL_API_KEY in your .env file, or pass it to Firecrawl.');
        }
        this.apiKey = apiKey;
        this.url = url;
        this.mode = mode;
        this.params = params;
        this.apiUrl = apiUrl || 'https://api.firecrawl.dev';
    }
    async load() {
        const app = new FirecrawlApp({ apiKey: this.apiKey, apiUrl: this.apiUrl });
        let firecrawlDocs;
        if (this.mode === 'scrape') {
            const response = await app.scrapeUrl(this.url, this.params);
            if (!response.success) {
                throw new Error(`Firecrawl: Failed to scrape URL. Error: ${response.error}`);
            }
            firecrawlDocs = [response.data];
        }
        else if (this.mode === 'crawl') {
            const response = await app.crawlUrl(this.url, this.params, true);
            firecrawlDocs = response;
        }
        else {
            throw new Error(`Unrecognized mode '${this.mode}'. Expected one of 'crawl', 'scrape'.`);
        }
        return firecrawlDocs.map((doc) => new documents_1.Document({
            pageContent: doc.markdown || '',
            metadata: doc.metadata || {}
        }));
    }
}
// Flowise Node Class
class FireCrawl_DocumentLoaders {
    constructor() {
        this.label = 'FireCrawl';
        this.name = 'fireCrawl';
        this.type = 'Document';
        this.icon = 'firecrawl.png';
        this.version = 2.0;
        this.category = 'Document Loaders';
        this.description = 'Load data from URL using FireCrawl';
        this.baseClasses = [this.type];
        this.credential = {
            label: 'FireCrawl API',
            name: 'credential',
            type: 'credential',
            credentialNames: ['fireCrawlApi']
        };
        this.inputs = [
            {
                label: 'Text Splitter',
                name: 'textSplitter',
                type: 'TextSplitter',
                optional: true
            },
            {
                label: 'URLs',
                name: 'url',
                type: 'string',
                description: 'URL to be crawled/scraped',
                placeholder: 'https://docs.flowiseai.com'
            },
            {
                label: 'Crawler type',
                type: 'options',
                name: 'crawlerType',
                options: [
                    {
                        label: 'Crawl',
                        name: 'crawl',
                        description: 'Crawl a URL and all accessible subpages'
                    },
                    {
                        label: 'Scrape',
                        name: 'scrape',
                        description: 'Scrape a URL and get its content'
                    }
                ],
                default: 'crawl'
            }
            // ... (other input parameters)
        ];
        this.outputs = [
            {
                label: 'Document',
                name: 'document',
                description: 'Array of document objects containing metadata and pageContent',
                baseClasses: [...this.baseClasses, 'json']
            },
            {
                label: 'Text',
                name: 'text',
                description: 'Concatenated string from pageContent of documents',
                baseClasses: ['string', 'json']
            }
        ];
    }
    async init(nodeData, _, options) {
        const textSplitter = nodeData.inputs?.textSplitter;
        const metadata = nodeData.inputs?.metadata;
        const url = nodeData.inputs?.url;
        const crawlerType = nodeData.inputs?.crawlerType;
        const maxCrawlPages = nodeData.inputs?.maxCrawlPages;
        const generateImgAltText = nodeData.inputs?.generateImgAltText;
        const returnOnlyUrls = nodeData.inputs?.returnOnlyUrls;
        const onlyMainContent = nodeData.inputs?.onlyMainContent;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const firecrawlApiToken = (0, utils_1.getCredentialParam)('firecrawlApiToken', credentialData, nodeData);
        const firecrawlApiUrl = (0, utils_1.getCredentialParam)('firecrawlApiUrl', credentialData, nodeData, 'https://api.firecrawl.dev');
        const output = nodeData.outputs?.output;
        const urlPatternsExcludes = nodeData.inputs?.urlPatternsExcludes
            ? nodeData.inputs.urlPatternsExcludes.split(',')
            : undefined;
        const urlPatternsIncludes = nodeData.inputs?.urlPatternsIncludes
            ? nodeData.inputs.urlPatternsIncludes.split(',')
            : undefined;
        const input = {
            url,
            mode: crawlerType,
            apiKey: firecrawlApiToken,
            apiUrl: firecrawlApiUrl,
            params: {
                crawlerOptions: {
                    includes: urlPatternsIncludes,
                    excludes: urlPatternsExcludes,
                    generateImgAltText,
                    returnOnlyUrls,
                    limit: maxCrawlPages ? parseFloat(maxCrawlPages) : undefined
                },
                pageOptions: {
                    onlyMainContent
                }
            }
        };
        const loader = new FireCrawlLoader(input);
        let docs = [];
        if (textSplitter) {
            docs = await loader.loadAndSplit(textSplitter);
        }
        else {
            docs = await loader.load();
        }
        if (metadata) {
            const parsedMetadata = typeof metadata === 'object' ? metadata : JSON.parse(metadata);
            let finaldocs = [];
            for (const doc of docs) {
                const newdoc = {
                    ...doc,
                    metadata: {
                        ...doc.metadata,
                        ...parsedMetadata
                    }
                };
                finaldocs.push(newdoc);
            }
            return finaldocs;
        }
        if (output === 'document') {
            return docs;
        }
        else {
            let finaltext = '';
            for (const doc of docs) {
                finaltext += `${doc.pageContent}\n`;
            }
            return (0, utils_1.handleEscapeCharacters)(finaltext, false);
        }
    }
}
module.exports = { nodeClass: FireCrawl_DocumentLoaders };
//# sourceMappingURL=FireCrawl.js.map