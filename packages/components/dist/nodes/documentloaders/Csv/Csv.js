"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const csv_1 = require("@langchain/community/document_loaders/fs/csv");
const src_1 = require("../../../src");
class Csv_DocumentLoaders {
    constructor() {
        this.label = 'Csv File';
        this.name = 'csvFile';
        this.version = 2.0;
        this.type = 'Document';
        this.icon = 'csv.svg';
        this.category = 'Document Loaders';
        this.description = `Load data from CSV files`;
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Csv File',
                name: 'csvFile',
                type: 'file',
                fileType: '.csv'
            },
            {
                label: 'Text Splitter',
                name: 'textSplitter',
                type: 'TextSplitter',
                optional: true
            },
            {
                label: 'Single Column Extraction',
                name: 'columnName',
                type: 'string',
                description: 'Extracting a single column',
                placeholder: 'Enter column name',
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
        const textSplitter = nodeData.inputs?.textSplitter;
        const csvFileBase64 = nodeData.inputs?.csvFile;
        const columnName = nodeData.inputs?.columnName;
        const metadata = nodeData.inputs?.metadata;
        const output = nodeData.outputs?.output;
        const _omitMetadataKeys = nodeData.inputs?.omitMetadataKeys;
        let omitMetadataKeys = [];
        if (_omitMetadataKeys) {
            omitMetadataKeys = _omitMetadataKeys.split(',').map((key) => key.trim());
        }
        let docs = [];
        let files = [];
        if (csvFileBase64.startsWith('FILE-STORAGE::')) {
            const fileName = csvFileBase64.replace('FILE-STORAGE::', '');
            if (fileName.startsWith('[') && fileName.endsWith(']')) {
                files = JSON.parse(fileName);
            }
            else {
                files = [fileName];
            }
            const chatflowid = options.chatflowid;
            for (const file of files) {
                if (!file)
                    continue;
                const fileData = await (0, src_1.getFileFromStorage)(file, chatflowid);
                const blob = new Blob([fileData]);
                const loader = new csv_1.CSVLoader(blob, columnName.trim().length === 0 ? undefined : columnName.trim());
                if (textSplitter) {
                    docs = await loader.load();
                    docs = await textSplitter.splitDocuments(docs);
                }
                else {
                    docs.push(...(await loader.load()));
                }
            }
        }
        else {
            if (csvFileBase64.startsWith('[') && csvFileBase64.endsWith(']')) {
                files = JSON.parse(csvFileBase64);
            }
            else {
                files = [csvFileBase64];
            }
            for (const file of files) {
                if (!file)
                    continue;
                const splitDataURI = file.split(',');
                splitDataURI.pop();
                const bf = Buffer.from(splitDataURI.pop() || '', 'base64');
                const blob = new Blob([bf]);
                const loader = new csv_1.CSVLoader(blob, columnName.trim().length === 0 ? undefined : columnName.trim());
                if (textSplitter) {
                    docs = await loader.load();
                    docs = await textSplitter.splitDocuments(docs);
                }
                else {
                    docs.push(...(await loader.load()));
                }
            }
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
module.exports = { nodeClass: Csv_DocumentLoaders };
//# sourceMappingURL=Csv.js.map