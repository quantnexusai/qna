"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../src/utils");
const mysqlSaver_1 = require("./mysqlSaver");
class MySQLAgentMemory_Memory {
    constructor() {
        this.label = 'MySQL Agent Memory';
        this.name = 'mySQLAgentMemory';
        this.version = 1.0;
        this.type = 'AgentMemory';
        this.icon = 'mysql.png';
        this.category = 'Memory';
        this.description = 'Memory for agentflow to remember the state of the conversation using MySQL database';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(mysqlSaver_1.MySQLSaver)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['MySQLApi'],
            optional: true
        };
        this.inputs = [
            {
                label: 'Host',
                name: 'host',
                type: 'string'
            },
            {
                label: 'Database',
                name: 'database',
                type: 'string'
            },
            {
                label: 'Port',
                name: 'port',
                type: 'number',
                default: '3306'
            },
            {
                label: 'Additional Connection Configuration',
                name: 'additionalConfig',
                type: 'json',
                additionalParams: true,
                optional: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const additionalConfig = nodeData.inputs?.additionalConfig;
        const databaseEntities = options.databaseEntities;
        const chatflowid = options.chatflowid;
        const appDataSource = options.appDataSource;
        let additionalConfiguration = {};
        if (additionalConfig) {
            try {
                additionalConfiguration = typeof additionalConfig === 'object' ? additionalConfig : JSON.parse(additionalConfig);
            }
            catch (exception) {
                throw new Error('Invalid JSON in the Additional Configuration: ' + exception);
            }
        }
        const threadId = options.sessionId || options.chatId;
        let datasourceOptions = {
            ...additionalConfiguration,
            type: 'mysql'
        };
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const user = (0, utils_1.getCredentialParam)('user', credentialData, nodeData);
        const password = (0, utils_1.getCredentialParam)('password', credentialData, nodeData);
        const _port = nodeData.inputs?.port || '3306';
        const port = parseInt(_port);
        datasourceOptions = {
            ...datasourceOptions,
            host: nodeData.inputs?.host,
            port,
            database: nodeData.inputs?.database,
            username: user,
            user: user,
            password: password,
            charset: 'utf8mb4'
        };
        const args = {
            datasourceOptions,
            threadId,
            appDataSource,
            databaseEntities,
            chatflowid
        };
        const recordManager = new mysqlSaver_1.MySQLSaver(args);
        return recordManager;
    }
}
module.exports = { nodeClass: MySQLAgentMemory_Memory };
//# sourceMappingURL=MySQLAgentMemory.js.map