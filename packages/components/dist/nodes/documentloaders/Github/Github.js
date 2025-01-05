"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const github_1 = require("@langchain/community/document_loaders/web/github");
const src_1 = require("../../../src");
class Github_DocumentLoaders {
    constructor() {
        this.label = 'Github';
        this.name = 'github';
        this.version = 3.0;
        this.type = 'Document';
        this.icon = 'github.svg';
        this.category = 'Document Loaders';
        this.description = `Load data from a GitHub repository`;
        this.baseClasses = [this.type];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            description: 'Only needed when accessing private repo',
            optional: true,
            credentialNames: ['githubApi']
        };
        this.inputs = [
            {
                label: 'Repo Link',
                name: 'repoLink',
                type: 'string',
                placeholder: 'https://github.com/FlowiseAI/Flowise'
            },
            {
                label: 'Branch',
                name: 'branch',
                type: 'string',
                default: 'main'
            },
            {
                label: 'Recursive',
                name: 'recursive',
                type: 'boolean',
                optional: true
            },
            {
                label: 'Max Concurrency',
                name: 'maxConcurrency',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Ignore Paths',
                name: 'ignorePath',
                description: 'An array of paths to be ignored',
                placeholder: `["*.md"]`,
                type: 'string',
                rows: 4,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Max Retries',
                name: 'maxRetries',
                description: 'The maximum number of retries that can be made for a single call, with an exponential backoff between each attempt. Defaults to 2.',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Text Splitter',
                name: 'textSplitter',
                type: 'TextSplitter',
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
    async init(nodeData, _, options) {
        const repoLink = nodeData.inputs?.repoLink;
        const branch = nodeData.inputs?.branch;
        const recursive = nodeData.inputs?.recursive;
        const textSplitter = nodeData.inputs?.textSplitter;
        const metadata = nodeData.inputs?.metadata;
        const maxConcurrency = nodeData.inputs?.maxConcurrency;
        const maxRetries = nodeData.inputs?.maxRetries;
        const ignorePath = nodeData.inputs?.ignorePath;
        const _omitMetadataKeys = nodeData.inputs?.omitMetadataKeys;
        const output = nodeData.outputs?.output;
        let omitMetadataKeys = [];
        if (_omitMetadataKeys) {
            omitMetadataKeys = _omitMetadataKeys.split(',').map((key) => key.trim());
        }
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const accessToken = (0, src_1.getCredentialParam)('accessToken', credentialData, nodeData);
        const githubOptions = {
            branch,
            recursive,
            unknown: 'warn'
        };
        if (accessToken)
            githubOptions.accessToken = accessToken;
        if (maxConcurrency)
            githubOptions.maxConcurrency = parseInt(maxConcurrency, 10);
        if (maxRetries)
            githubOptions.maxRetries = parseInt(maxRetries, 10);
        if (ignorePath)
            githubOptions.ignorePaths = JSON.parse(ignorePath);
        const loader = new github_1.GithubRepoLoader(repoLink, githubOptions);
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
            return (0, src_1.handleEscapeCharacters)(finaltext, false);
        }
    }
}
module.exports = { nodeClass: Github_DocumentLoaders };
//# sourceMappingURL=Github.js.map