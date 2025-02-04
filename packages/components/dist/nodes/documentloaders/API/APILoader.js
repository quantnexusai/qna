"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const lodash_1 = require("lodash");
const documents_1 = require("@langchain/core/documents");
const base_1 = require("langchain/document_loaders/base");
const utils_1 = require("../../../src/utils");
class API_DocumentLoaders {
    constructor() {
        this.label = 'API Loader';
        this.name = 'apiLoader';
        this.version = 2.0;
        this.type = 'Document';
        this.icon = 'api.svg';
        this.category = 'Document Loaders';
        this.description = `Load data from an API`;
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Text Splitter',
                name: 'textSplitter',
                type: 'TextSplitter',
                optional: true
            },
            {
                label: 'Method',
                name: 'method',
                type: 'options',
                options: [
                    {
                        label: 'GET',
                        name: 'GET'
                    },
                    {
                        label: 'POST',
                        name: 'POST'
                    }
                ]
            },
            {
                label: 'URL',
                name: 'url',
                type: 'string'
            },
            {
                label: 'Headers',
                name: 'headers',
                type: 'json',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Body',
                name: 'body',
                type: 'json',
                description: 'JSON body for the POST request. If not specified, agent will try to figure out itself from AIPlugin if provided',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Additional Metadata',
                name: 'metadata',
                type: 'json',
                description: 'Additional metadata to be added to the extracted documents',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Omit Metadata Keys',
                name: 'omitMetadataKeys',
                type: 'string',
                rows: 4,
                description: 'Each document loader comes with a default set of metadata keys that are extracted from the document. You can use this field to omit some of the default metadata keys. The value should be a list of keys, seperated by comma. Use * to omit all metadata keys execept the ones you specify in the Additional Metadata field',
                placeholder: 'key1, key2, key3.nestedKey1',
                optional: true,
                additionalParams: true
            }
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
    async init(nodeData) {
        const headers = nodeData.inputs?.headers;
        const url = nodeData.inputs?.url;
        const body = nodeData.inputs?.body;
        const method = nodeData.inputs?.method;
        const textSplitter = nodeData.inputs?.textSplitter;
        const metadata = nodeData.inputs?.metadata;
        const _omitMetadataKeys = nodeData.inputs?.omitMetadataKeys;
        const output = nodeData.outputs?.output;
        let omitMetadataKeys = [];
        if (_omitMetadataKeys) {
            omitMetadataKeys = _omitMetadataKeys.split(',').map((key) => key.trim());
        }
        const options = {
            url,
            method
        };
        if (headers) {
            const parsedHeaders = typeof headers === 'object' ? headers : JSON.parse(headers);
            options.headers = parsedHeaders;
        }
        if (body) {
            const parsedBody = typeof body === 'object' ? body : JSON.parse(body);
            options.body = parsedBody;
        }
        const loader = new ApiLoader(options);
        let docs = [];
        if (textSplitter) {
            docs = await loader.load();
            docs = await textSplitter.splitDocuments(docs);
        }
        else {
            docs = await loader.load();
        }
        if (metadata) {
            const parsedMetadata = typeof metadata === 'object' ? metadata : JSON.parse(metadata);
            docs = docs.map((doc) => ({
                ...doc,
                metadata: _omitMetadataKeys === '*'
                    ? {
                        ...parsedMetadata
                    }
                    : (0, lodash_1.omit)({
                        ...doc.metadata,
                        ...parsedMetadata
                    }, omitMetadataKeys)
            }));
        }
        else {
            docs = docs.map((doc) => ({
                ...doc,
                metadata: _omitMetadataKeys === '*'
                    ? {}
                    : (0, lodash_1.omit)({
                        ...doc.metadata
                    }, omitMetadataKeys)
            }));
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
class ApiLoader extends base_1.BaseDocumentLoader {
    constructor({ url, headers, body, method }) {
        super();
        this.url = url;
        this.headers = headers;
        this.body = body;
        this.method = method;
    }
    async load() {
        if (this.method === 'POST') {
            return this.executePostRequest(this.url, this.headers, this.body);
        }
        else {
            return this.executeGetRequest(this.url, this.headers);
        }
    }
    async executeGetRequest(url, headers) {
        try {
            const config = {};
            if (headers) {
                config.headers = headers;
            }
            const response = await axios_1.default.get(url, config);
            const responseJsonString = JSON.stringify(response.data, null, 2);
            const doc = new documents_1.Document({
                pageContent: responseJsonString,
                metadata: {
                    url
                }
            });
            return [doc];
        }
        catch (error) {
            throw new Error(`Failed to fetch ${url}: ${error}`);
        }
    }
    async executePostRequest(url, headers, body) {
        try {
            const config = {};
            if (headers) {
                config.headers = headers;
            }
            const response = await axios_1.default.post(url, body ?? {}, config);
            const responseJsonString = JSON.stringify(response.data, null, 2);
            const doc = new documents_1.Document({
                pageContent: responseJsonString,
                metadata: {
                    url
                }
            });
            return [doc];
        }
        catch (error) {
            throw new Error(`Failed to post ${url}: ${error}`);
        }
    }
}
module.exports = {
    nodeClass: API_DocumentLoaders
};
//# sourceMappingURL=APILoader.js.map