"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PGVectorDriver = void 0;
const Base_1 = require("./Base");
const src_1 = require("../../../../src");
const pgvector_1 = require("@langchain/community/vectorstores/pgvector");
const utils_1 = require("../utils");
class PGVectorDriver extends Base_1.VectorStoreDriver {
    async getPostgresConnectionOptions() {
        if (!this._postgresConnectionOptions) {
            const { user, password } = await this.getCredentials();
            const additionalConfig = this.nodeData.inputs?.additionalConfig;
            let additionalConfiguration = {};
            if (additionalConfig) {
                try {
                    additionalConfiguration = typeof additionalConfig === 'object' ? additionalConfig : JSON.parse(additionalConfig);
                }
                catch (exception) {
                    throw new Error('Invalid JSON in the Additional Configuration: ' + exception);
                }
            }
            this._postgresConnectionOptions = {
                ...additionalConfiguration,
                host: this.getHost(),
                port: this.getPort(),
                user: user,
                password: password,
                database: this.getDatabase()
            };
            // Prevent using default MySQL port, otherwise will throw uncaught error and crashing the app
            if (this.getHost() === '3006') {
                throw new Error('Invalid port number');
            }
        }
        return this._postgresConnectionOptions;
    }
    async getArgs() {
        return {
            postgresConnectionOptions: await this.getPostgresConnectionOptions(),
            tableName: this.getTableName(),
            columns: {
                contentColumnName: (0, utils_1.getContentColumnName)(this.nodeData)
            },
            distanceStrategy: (this.nodeData.inputs?.distanceStrategy || 'cosine')
        };
    }
    async instanciate(metadataFilters) {
        return this.adaptInstance(await pgvector_1.PGVectorStore.initialize(this.getEmbeddings(), await this.getArgs()), metadataFilters);
    }
    async fromDocuments(documents) {
        const instance = await this.instanciate();
        await instance.addDocuments(documents);
        return this.adaptInstance(instance);
    }
    async adaptInstance(instance, metadataFilters) {
        const { [src_1.FLOWISE_CHATID]: chatId, ...pgMetadataFilter } = metadataFilters || {};
        const baseSimilaritySearchVectorWithScoreFn = instance.similaritySearchVectorWithScore.bind(instance);
        instance.similaritySearchVectorWithScore = async (query, k, filter) => {
            return await baseSimilaritySearchVectorWithScoreFn(query, k, filter ?? pgMetadataFilter);
        };
        const basePoolQueryFn = instance.pool.query.bind(instance.pool);
        // @ts-ignore
        instance.pool.query = async (queryString, parameters) => {
            if (!instance.client) {
                instance.client = await instance.pool.connect();
            }
            const whereClauseRegex = /WHERE ([^\n]+)/;
            let chatflowOr = '';
            // Match chatflow uploaded file and keep filtering on other files:
            // https://github.com/FlowiseAI/Flowise/pull/3367#discussion_r1804229295
            if (chatId) {
                parameters.push({ [src_1.FLOWISE_CHATID]: chatId });
                chatflowOr = `OR metadata @> $${parameters.length}`;
            }
            if (queryString.match(whereClauseRegex)) {
                queryString = queryString.replace(whereClauseRegex, `WHERE (($1) AND NOT (metadata ? '${src_1.FLOWISE_CHATID}')) ${chatflowOr}`);
            }
            else {
                const orderByClauseRegex = /ORDER BY (.*)/;
                // Insert WHERE clause before ORDER BY
                queryString = queryString.replace(orderByClauseRegex, `WHERE (metadata @> '{}' AND NOT (metadata ? '${src_1.FLOWISE_CHATID}')) ${chatflowOr}
                ORDER BY $1
                `);
            }
            // Run base function
            const queryResult = await basePoolQueryFn(queryString, parameters);
            // ensure connection is released
            instance.client.release();
            instance.client = undefined;
            return queryResult;
        };
        return instance;
    }
}
exports.PGVectorDriver = PGVectorDriver;
PGVectorDriver.CONTENT_COLUMN_NAME_DEFAULT = 'pageContent';
//# sourceMappingURL=PGVector.js.map