"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const documents_1 = require("@langchain/core/documents");
const faiss_1 = require("@langchain/community/vectorstores/faiss");
const utils_1 = require("../../../src/utils");
class Faiss_VectorStores {
    constructor() {
        //@ts-ignore
        this.vectorStoreMethods = {
            async upsert(nodeData) {
                const docs = nodeData.inputs?.document;
                const embeddings = nodeData.inputs?.embeddings;
                const basePath = nodeData.inputs?.basePath;
                const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
                const finalDocs = [];
                for (let i = 0; i < flattenDocs.length; i += 1) {
                    if (flattenDocs[i] && flattenDocs[i].pageContent) {
                        finalDocs.push(new documents_1.Document(flattenDocs[i]));
                    }
                }
                try {
                    const vectorStore = await faiss_1.FaissStore.fromDocuments(finalDocs, embeddings);
                    await vectorStore.save(basePath);
                    // Avoid illegal invocation error
                    vectorStore.similaritySearchVectorWithScore = async (query, k) => {
                        return await similaritySearchVectorWithScore(query, k, vectorStore);
                    };
                    return { numAdded: finalDocs.length, addedDocs: finalDocs };
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        };
        this.label = 'Faiss';
        this.name = 'faiss';
        this.version = 1.0;
        this.type = 'Faiss';
        this.icon = 'faiss.svg';
        this.category = 'Vector Stores';
        this.description = 'Upsert embedded data and perform similarity search upon query using Faiss library from Meta';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
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
                label: 'Base Path to load',
                name: 'basePath',
                description: 'Path to load faiss.index file',
                placeholder: `C:\\Users\\User\\Desktop`,
                type: 'string'
            },
            {
                label: 'Top K',
                name: 'topK',
                description: 'Number of top results to fetch. Default to 4',
                placeholder: '4',
                type: 'number',
                additionalParams: true,
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'Faiss Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Faiss Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(faiss_1.FaissStore)]
            }
        ];
    }
    async init(nodeData) {
        const embeddings = nodeData.inputs?.embeddings;
        const basePath = nodeData.inputs?.basePath;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const vectorStore = await faiss_1.FaissStore.load(basePath, embeddings);
        // Avoid illegal invocation error
        vectorStore.similaritySearchVectorWithScore = async (query, k) => {
            return await similaritySearchVectorWithScore(query, k, vectorStore);
        };
        if (output === 'retriever') {
            const retriever = vectorStore.asRetriever(k);
            return retriever;
        }
        else if (output === 'vectorStore') {
            ;
            vectorStore.k = k;
            return vectorStore;
        }
        return vectorStore;
    }
}
const similaritySearchVectorWithScore = async (query, k, vectorStore) => {
    const index = vectorStore.index;
    if (k > index.ntotal()) {
        const total = index.ntotal();
        console.warn(`k (${k}) is greater than the number of elements in the index (${total}), setting k to ${total}`);
        k = total;
    }
    const result = index.search(query, k);
    return result.labels.map((id, index) => {
        const uuid = vectorStore._mapping[id];
        return [vectorStore.docstore.search(uuid), result.distances[index]];
    });
};
module.exports = { nodeClass: Faiss_VectorStores };
//# sourceMappingURL=Faiss.js.map