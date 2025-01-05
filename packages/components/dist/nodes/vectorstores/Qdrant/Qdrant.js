"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const uuid_1 = require("uuid");
const js_client_rest_1 = require("@qdrant/js-client-rest");
const documents_1 = require("@langchain/core/documents");
const qdrant_1 = require("@langchain/qdrant");
const utils_1 = require("../../../src/utils");
const indexing_1 = require("../../../src/indexing");
const VectorStoreUtils_1 = require("../VectorStoreUtils");
class Qdrant_VectorStores {
    constructor() {
        //@ts-ignore
        this.vectorStoreMethods = {
            async upsert(nodeData, options) {
                const qdrantServerUrl = nodeData.inputs?.qdrantServerUrl;
                const collectionName = nodeData.inputs?.qdrantCollection;
                const docs = nodeData.inputs?.document;
                const embeddings = nodeData.inputs?.embeddings;
                const qdrantSimilarity = nodeData.inputs?.qdrantSimilarity;
                const qdrantVectorDimension = nodeData.inputs?.qdrantVectorDimension;
                const recordManager = nodeData.inputs?.recordManager;
                const _batchSize = nodeData.inputs?.batchSize;
                const contentPayloadKey = nodeData.inputs?.contentPayloadKey || 'content';
                const metadataPayloadKey = nodeData.inputs?.metadataPayloadKey || 'metadata';
                const isFileUploadEnabled = nodeData.inputs?.fileUpload;
                const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
                const qdrantApiKey = (0, utils_1.getCredentialParam)('qdrantApiKey', credentialData, nodeData);
                const port = Qdrant_VectorStores.determinePortByUrl(qdrantServerUrl);
                const client = new js_client_rest_1.QdrantClient({
                    url: qdrantServerUrl,
                    apiKey: qdrantApiKey,
                    port: port
                });
                const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
                const finalDocs = [];
                for (let i = 0; i < flattenDocs.length; i += 1) {
                    if (flattenDocs[i] && flattenDocs[i].pageContent) {
                        if (isFileUploadEnabled && options.chatId) {
                            flattenDocs[i].metadata = { ...flattenDocs[i].metadata, [utils_1.FLOWISE_CHATID]: options.chatId };
                        }
                        finalDocs.push(new documents_1.Document(flattenDocs[i]));
                    }
                }
                const dbConfig = {
                    client,
                    url: qdrantServerUrl,
                    collectionName,
                    collectionConfig: {
                        vectors: {
                            size: qdrantVectorDimension ? parseInt(qdrantVectorDimension, 10) : 1536,
                            distance: qdrantSimilarity ?? 'Cosine'
                        }
                    },
                    contentPayloadKey,
                    metadataPayloadKey
                };
                try {
                    if (recordManager) {
                        const vectorStore = new qdrant_1.QdrantVectorStore(embeddings, dbConfig);
                        await vectorStore.ensureCollection();
                        vectorStore.addVectors = async (vectors, documents, documentOptions) => {
                            if (vectors.length === 0) {
                                return;
                            }
                            await vectorStore.ensureCollection();
                            const points = vectors.map((embedding, idx) => ({
                                id: documentOptions?.ids?.length ? documentOptions?.ids[idx] : (0, uuid_1.v4)(),
                                vector: embedding,
                                payload: {
                                    [contentPayloadKey]: documents[idx].pageContent,
                                    [metadataPayloadKey]: documents[idx].metadata,
                                    customPayload: documentOptions?.customPayload?.length ? documentOptions?.customPayload[idx] : undefined
                                }
                            }));
                            try {
                                if (_batchSize) {
                                    const batchSize = parseInt(_batchSize, 10);
                                    for (let i = 0; i < points.length; i += batchSize) {
                                        const batchPoints = points.slice(i, i + batchSize);
                                        await client.upsert(collectionName, {
                                            wait: true,
                                            points: batchPoints
                                        });
                                    }
                                }
                                else {
                                    await client.upsert(collectionName, {
                                        wait: true,
                                        points
                                    });
                                }
                            }
                            catch (e) {
                                const error = new Error(`${e?.status ?? 'Undefined error code'} ${e?.message}: ${e?.data?.status?.error}`);
                                throw error;
                            }
                        };
                        vectorStore.delete = async (params) => {
                            const { ids } = params;
                            if (ids?.length) {
                                try {
                                    client.delete(collectionName, {
                                        points: ids
                                    });
                                }
                                catch (e) {
                                    console.error('Failed to delete');
                                }
                            }
                        };
                        await recordManager.createSchema();
                        const res = await (0, indexing_1.index)({
                            docsSource: finalDocs,
                            recordManager,
                            vectorStore,
                            options: {
                                cleanup: recordManager?.cleanup,
                                sourceIdKey: recordManager?.sourceIdKey ?? 'source',
                                vectorStoreName: collectionName
                            }
                        });
                        return res;
                    }
                    else {
                        if (_batchSize) {
                            const batchSize = parseInt(_batchSize, 10);
                            for (let i = 0; i < finalDocs.length; i += batchSize) {
                                const batch = finalDocs.slice(i, i + batchSize);
                                await qdrant_1.QdrantVectorStore.fromDocuments(batch, embeddings, dbConfig);
                            }
                        }
                        else {
                            await qdrant_1.QdrantVectorStore.fromDocuments(finalDocs, embeddings, dbConfig);
                        }
                        return { numAdded: finalDocs.length, addedDocs: finalDocs };
                    }
                }
                catch (e) {
                    throw new Error(e);
                }
            },
            async delete(nodeData, ids, options) {
                const qdrantServerUrl = nodeData.inputs?.qdrantServerUrl;
                const collectionName = nodeData.inputs?.qdrantCollection;
                const embeddings = nodeData.inputs?.embeddings;
                const qdrantSimilarity = nodeData.inputs?.qdrantSimilarity;
                const qdrantVectorDimension = nodeData.inputs?.qdrantVectorDimension;
                const recordManager = nodeData.inputs?.recordManager;
                const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
                const qdrantApiKey = (0, utils_1.getCredentialParam)('qdrantApiKey', credentialData, nodeData);
                const port = Qdrant_VectorStores.determinePortByUrl(qdrantServerUrl);
                const client = new js_client_rest_1.QdrantClient({
                    url: qdrantServerUrl,
                    apiKey: qdrantApiKey,
                    port: port
                });
                const dbConfig = {
                    client,
                    url: qdrantServerUrl,
                    collectionName,
                    collectionConfig: {
                        vectors: {
                            size: qdrantVectorDimension ? parseInt(qdrantVectorDimension, 10) : 1536,
                            distance: qdrantSimilarity ?? 'Cosine'
                        }
                    }
                };
                const vectorStore = new qdrant_1.QdrantVectorStore(embeddings, dbConfig);
                vectorStore.delete = async (params) => {
                    const { ids } = params;
                    if (ids?.length) {
                        try {
                            client.delete(collectionName, {
                                points: ids
                            });
                        }
                        catch (e) {
                            console.error('Failed to delete');
                        }
                    }
                };
                try {
                    if (recordManager) {
                        const vectorStoreName = collectionName;
                        await recordManager.createSchema();
                        recordManager.namespace = recordManager.namespace + '_' + vectorStoreName;
                        const keys = await recordManager.listKeys({});
                        await vectorStore.delete({ ids: keys });
                        await recordManager.deleteKeys(keys);
                    }
                    else {
                        await vectorStore.delete({ ids });
                    }
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        };
        this.label = 'Qdrant';
        this.name = 'qdrant';
        this.version = 5.0;
        this.type = 'Qdrant';
        this.icon = 'qdrant.png';
        this.category = 'Vector Stores';
        this.description =
            'Upsert embedded data and perform similarity search upon query using Qdrant, a scalable open source vector database written in Rust';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            description: 'Only needed when using Qdrant cloud hosted',
            optional: true,
            credentialNames: ['qdrantApi']
        };
        this.inputs = [
            {
                label: 'Document',
                name: 'document',
                type: 'Document',
                list: true,
                optional: true
            },
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            },
            {
                label: 'Record Manager',
                name: 'recordManager',
                type: 'RecordManager',
                description: 'Keep track of the record to prevent duplication',
                optional: true
            },
            {
                label: 'Qdrant Server URL',
                name: 'qdrantServerUrl',
                type: 'string',
                placeholder: 'http://localhost:6333'
            },
            {
                label: 'Qdrant Collection Name',
                name: 'qdrantCollection',
                type: 'string'
            },
            {
                label: 'File Upload',
                name: 'fileUpload',
                description: 'Allow file upload on the chat',
                hint: {
                    label: 'How to use',
                    value: VectorStoreUtils_1.howToUseFileUpload
                },
                type: 'boolean',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Vector Dimension',
                name: 'qdrantVectorDimension',
                type: 'number',
                default: 1536,
                additionalParams: true
            },
            {
                label: 'Content Key',
                name: 'contentPayloadKey',
                description: 'The key for storing text. Default to `content`',
                type: 'string',
                default: 'content',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Metadata Key',
                name: 'metadataPayloadKey',
                description: 'The key for storing metadata. Default to `metadata`',
                type: 'string',
                default: 'metadata',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Upsert Batch Size',
                name: 'batchSize',
                type: 'number',
                step: 1,
                description: 'Upsert in batches of size N',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Similarity',
                name: 'qdrantSimilarity',
                description: 'Similarity measure used in Qdrant.',
                type: 'options',
                default: 'Cosine',
                options: [
                    {
                        label: 'Cosine',
                        name: 'Cosine'
                    },
                    {
                        label: 'Euclid',
                        name: 'Euclid'
                    },
                    {
                        label: 'Dot',
                        name: 'Dot'
                    }
                ],
                additionalParams: true
            },
            {
                label: 'Additional Collection Cofiguration',
                name: 'qdrantCollectionConfiguration',
                description: 'Refer to <a target="_blank" href="https://qdrant.tech/documentation/concepts/collections">collection docs</a> for more reference',
                type: 'json',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Top K',
                name: 'topK',
                description: 'Number of top results to fetch. Default to 4',
                placeholder: '4',
                type: 'number',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Qdrant Search Filter',
                name: 'qdrantFilter',
                description: 'Only return points which satisfy the conditions',
                type: 'json',
                additionalParams: true,
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'Qdrant Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Qdrant Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(qdrant_1.QdrantVectorStore)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const qdrantServerUrl = nodeData.inputs?.qdrantServerUrl;
        const collectionName = nodeData.inputs?.qdrantCollection;
        let qdrantCollectionConfiguration = nodeData.inputs?.qdrantCollectionConfiguration;
        const embeddings = nodeData.inputs?.embeddings;
        const qdrantSimilarity = nodeData.inputs?.qdrantSimilarity;
        const qdrantVectorDimension = nodeData.inputs?.qdrantVectorDimension;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        let queryFilter = nodeData.inputs?.qdrantFilter;
        const contentPayloadKey = nodeData.inputs?.contentPayloadKey || 'content';
        const metadataPayloadKey = nodeData.inputs?.metadataPayloadKey || 'metadata';
        const isFileUploadEnabled = nodeData.inputs?.fileUpload;
        const k = topK ? parseFloat(topK) : 4;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const qdrantApiKey = (0, utils_1.getCredentialParam)('qdrantApiKey', credentialData, nodeData);
        const port = Qdrant_VectorStores.determinePortByUrl(qdrantServerUrl);
        const client = new js_client_rest_1.QdrantClient({
            url: qdrantServerUrl,
            apiKey: qdrantApiKey,
            port: port
        });
        const dbConfig = {
            client,
            collectionName,
            contentPayloadKey,
            metadataPayloadKey
        };
        const retrieverConfig = {
            k
        };
        if (qdrantCollectionConfiguration) {
            qdrantCollectionConfiguration =
                typeof qdrantCollectionConfiguration === 'object'
                    ? qdrantCollectionConfiguration
                    : JSON.parse(qdrantCollectionConfiguration);
            dbConfig.collectionConfig = {
                ...qdrantCollectionConfiguration,
                vectors: {
                    ...qdrantCollectionConfiguration.vectors,
                    size: qdrantVectorDimension ? parseInt(qdrantVectorDimension, 10) : 1536,
                    distance: qdrantSimilarity ?? 'Cosine'
                }
            };
        }
        if (queryFilter) {
            retrieverConfig.filter = typeof queryFilter === 'object' ? queryFilter : JSON.parse(queryFilter);
        }
        if (isFileUploadEnabled && options.chatId) {
            retrieverConfig.filter = retrieverConfig.filter || {};
            retrieverConfig.filter.should = Array.isArray(retrieverConfig.filter.should) ? retrieverConfig.filter.should : [];
            retrieverConfig.filter.should.push({
                key: `metadata.${utils_1.FLOWISE_CHATID}`,
                match: {
                    value: options.chatId
                }
            }, {
                is_empty: {
                    key: `metadata.${utils_1.FLOWISE_CHATID}`
                }
            });
        }
        const vectorStore = await qdrant_1.QdrantVectorStore.fromExistingCollection(embeddings, dbConfig);
        if (output === 'retriever') {
            const retriever = vectorStore.asRetriever(retrieverConfig);
            return retriever;
        }
        else if (output === 'vectorStore') {
            ;
            vectorStore.k = k;
            if (queryFilter) {
                ;
                vectorStore.filter = retrieverConfig.filter;
            }
            return vectorStore;
        }
        return vectorStore;
    }
    /**
     * Determine the port number from the given URL.
     *
     * The problem is when not doing this the qdrant-client.js will fall back on 6663 when you enter a port 443 and 80.
     * See: https://stackoverflow.com/questions/59104197/nodejs-new-url-urlhttps-myurl-com80-lists-the-port-as-empty
     * @param qdrantServerUrl the url to get the port from
     */
    static determinePortByUrl(qdrantServerUrl) {
        const parsedUrl = new URL(qdrantServerUrl);
        let port = parsedUrl.port ? parseInt(parsedUrl.port) : 6663;
        if (parsedUrl.protocol === 'https:' && parsedUrl.port === '') {
            port = 443;
        }
        if (parsedUrl.protocol === 'http:' && parsedUrl.port === '') {
            port = 80;
        }
        return port;
    }
}
module.exports = { nodeClass: Qdrant_VectorStores };
//# sourceMappingURL=Qdrant.js.map