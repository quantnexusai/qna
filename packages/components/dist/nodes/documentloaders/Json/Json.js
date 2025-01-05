"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const json_1 = require("langchain/document_loaders/fs/json");
const src_1 = require("../../../src");
class Json_DocumentLoaders {
    constructor() {
        this.label = 'Json File';
        this.name = 'jsonFile';
        this.version = 2.0;
        this.type = 'Document';
        this.icon = 'json.svg';
        this.category = 'Document Loaders';
        this.description = `Load data from JSON files`;
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Json File',
                name: 'jsonFile',
                type: 'file',
                fileType: '.json'
            },
            {
                label: 'Text Splitter',
                name: 'textSplitter',
                type: 'TextSplitter',
                optional: true
            },
            {
                label: 'Pointers Extraction (separated by commas)',
                name: 'pointersName',
                type: 'string',
                description: 'Extracting multiple pointers',
                placeholder: 'Enter pointers name',
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
        const jsonFileBase64 = nodeData.inputs?.jsonFile;
        const pointersName = nodeData.inputs?.pointersName;
        const metadata = nodeData.inputs?.metadata;
        const _omitMetadataKeys = nodeData.inputs?.omitMetadataKeys;
        const output = nodeData.outputs?.output;
        let omitMetadataKeys = [];
        if (_omitMetadataKeys) {
            omitMetadataKeys = _omitMetadataKeys.split(',').map((key) => key.trim());
        }
        let pointers = [];
        if (pointersName) {
            const outputString = pointersName.replace(/[^a-zA-Z0-9,]+/g, ',');
            pointers = outputString.split(',').map((pointer) => '/' + pointer.trim());
        }
        let docs = [];
        let files = [];
        //FILE-STORAGE::["CONTRIBUTING.md","LICENSE.md","README.md"]
        if (jsonFileBase64.startsWith('FILE-STORAGE::')) {
            const fileName = jsonFileBase64.replace('FILE-STORAGE::', '');
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
                const loader = new json_1.JSONLoader(blob, pointers.length != 0 ? pointers : undefined);
                if (textSplitter) {
                    let splittedDocs = await loader.load();
                    splittedDocs = await textSplitter.splitDocuments(splittedDocs);
                    docs.push(...splittedDocs);
                }
                else {
                    docs.push(...(await loader.load()));
                }
            }
        }
        else {
            if (jsonFileBase64.startsWith('[') && jsonFileBase64.endsWith(']')) {
                files = JSON.parse(jsonFileBase64);
            }
            else {
                files = [jsonFileBase64];
            }
            for (const file of files) {
                if (!file)
                    continue;
                const splitDataURI = file.split(',');
                splitDataURI.pop();
                const bf = Buffer.from(splitDataURI.pop() || '', 'base64');
                const blob = new Blob([bf]);
                const loader = new json_1.JSONLoader(blob, pointers.length != 0 ? pointers : undefined);
                if (textSplitter) {
                    let splittedDocs = await loader.load();
                    splittedDocs = await textSplitter.splitDocuments(splittedDocs);
                    docs.push(...splittedDocs);
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
module.exports = { nodeClass: Json_DocumentLoaders };
//# sourceMappingURL=Json.js.map