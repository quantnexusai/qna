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
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const s3_1 = require("@langchain/community/document_loaders/web/s3");
const unstructured_1 = require("@langchain/community/document_loaders/fs/unstructured");
const utils_1 = require("../../../src/utils");
const client_s3_1 = require("@aws-sdk/client-s3");
const modelLoader_1 = require("../../../src/modelLoader");
const node_stream_1 = require("node:stream");
const fsDefault = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const os = __importStar(require("node:os"));
class S3_DocumentLoaders {
    constructor() {
        this.loadMethods = {
            async listRegions() {
                return await (0, modelLoader_1.getRegions)(modelLoader_1.MODEL_TYPE.CHAT, 'awsChatBedrock');
            }
        };
        this.label = 'S3';
        this.name = 'S3';
        this.version = 4.0;
        this.type = 'Document';
        this.icon = 's3.svg';
        this.category = 'Document Loaders';
        this.description = 'Load Data from S3 Buckets';
        this.baseClasses = [this.type];
        this.credential = {
            label: 'AWS Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['awsApi'],
            optional: true
        };
        this.inputs = [
            {
                label: 'Bucket',
                name: 'bucketName',
                type: 'string'
            },
            {
                label: 'Object Key',
                name: 'keyName',
                type: 'string',
                description: 'The object key (or key name) that uniquely identifies object in an Amazon S3 bucket',
                placeholder: 'AI-Paper.pdf'
            },
            {
                label: 'Region',
                name: 'region',
                type: 'asyncOptions',
                loadMethod: 'listRegions',
                default: 'us-east-1'
            },
            {
                label: 'Unstructured API URL',
                name: 'unstructuredAPIUrl',
                description: 'Your Unstructured.io URL. Read <a target="_blank" href="https://unstructured-io.github.io/unstructured/introduction.html#getting-started">more</a> on how to get started',
                type: 'string',
                placeholder: process.env.UNSTRUCTURED_API_URL || 'http://localhost:8000/general/v0/general',
                optional: !!process.env.UNSTRUCTURED_API_URL
            },
            {
                label: 'Unstructured API KEY',
                name: 'unstructuredAPIKey',
                type: 'password',
                optional: true
            },
            {
                label: 'Strategy',
                name: 'strategy',
                description: 'The strategy to use for partitioning PDF/image. Options are fast, hi_res, auto. Default: auto.',
                type: 'options',
                options: [
                    {
                        label: 'Hi-Res',
                        name: 'hi_res'
                    },
                    {
                        label: 'Fast',
                        name: 'fast'
                    },
                    {
                        label: 'OCR Only',
                        name: 'ocr_only'
                    },
                    {
                        label: 'Auto',
                        name: 'auto'
                    }
                ],
                optional: true,
                additionalParams: true,
                default: 'auto'
            },
            {
                label: 'Encoding',
                name: 'encoding',
                description: 'The encoding method used to decode the text input. Default: utf-8.',
                type: 'string',
                optional: true,
                additionalParams: true,
                default: 'utf-8'
            },
            {
                label: 'Skip Infer Table Types',
                name: 'skipInferTableTypes',
                description: 'The document types that you want to skip table extraction with. Default: pdf, jpg, png.',
                type: 'multiOptions',
                options: [
                    {
                        label: 'doc',
                        name: 'doc'
                    },
                    {
                        label: 'docx',
                        name: 'docx'
                    },
                    {
                        label: 'eml',
                        name: 'eml'
                    },
                    {
                        label: 'epub',
                        name: 'epub'
                    },
                    {
                        label: 'heic',
                        name: 'heic'
                    },
                    {
                        label: 'htm',
                        name: 'htm'
                    },
                    {
                        label: 'html',
                        name: 'html'
                    },
                    {
                        label: 'jpeg',
                        name: 'jpeg'
                    },
                    {
                        label: 'jpg',
                        name: 'jpg'
                    },
                    {
                        label: 'md',
                        name: 'md'
                    },
                    {
                        label: 'msg',
                        name: 'msg'
                    },
                    {
                        label: 'odt',
                        name: 'odt'
                    },
                    {
                        label: 'pdf',
                        name: 'pdf'
                    },
                    {
                        label: 'png',
                        name: 'png'
                    },
                    {
                        label: 'ppt',
                        name: 'ppt'
                    },
                    {
                        label: 'pptx',
                        name: 'pptx'
                    },
                    {
                        label: 'rtf',
                        name: 'rtf'
                    },
                    {
                        label: 'text',
                        name: 'text'
                    },
                    {
                        label: 'txt',
                        name: 'txt'
                    },
                    {
                        label: 'xls',
                        name: 'xls'
                    },
                    {
                        label: 'xlsx',
                        name: 'xlsx'
                    }
                ],
                optional: true,
                additionalParams: true,
                default: '["pdf", "jpg", "png"]'
            },
            {
                label: 'Hi-Res Model Name',
                name: 'hiResModelName',
                description: 'The name of the inference model used when strategy is hi_res. Default: detectron2_onnx.',
                type: 'options',
                options: [
                    {
                        label: 'chipper',
                        name: 'chipper',
                        description: 'Exlusive to Unstructured hosted API. The Chipper model is Unstructured in-house image-to-text model based on transformer-based Visual Document Understanding (VDU) models.'
                    },
                    {
                        label: 'detectron2_onnx',
                        name: 'detectron2_onnx',
                        description: 'A Computer Vision model by Facebook AI that provides object detection and segmentation algorithms with ONNX Runtime. It is the fastest model with the hi_res strategy.'
                    },
                    {
                        label: 'yolox',
                        name: 'yolox',
                        description: 'A single-stage real-time object detector that modifies YOLOv3 with a DarkNet53 backbone.'
                    },
                    {
                        label: 'yolox_quantized',
                        name: 'yolox_quantized',
                        description: 'Runs faster than YoloX and its speed is closer to Detectron2.'
                    }
                ],
                optional: true,
                additionalParams: true,
                default: 'detectron2_onnx'
            },
            {
                label: 'Chunking Strategy',
                name: 'chunkingStrategy',
                description: 'Use one of the supported strategies to chunk the returned elements. When omitted, no chunking is performed and any other chunking parameters provided are ignored. Default: by_title',
                type: 'options',
                options: [
                    {
                        label: 'None',
                        name: 'None'
                    },
                    {
                        label: 'By Title',
                        name: 'by_title'
                    }
                ],
                optional: true,
                additionalParams: true,
                default: 'by_title'
            },
            {
                label: 'OCR Languages',
                name: 'ocrLanguages',
                description: 'The languages to use for OCR. Note: Being depricated as languages is the new type. Pending langchain update.',
                type: 'multiOptions',
                options: [
                    {
                        label: 'English',
                        name: 'eng'
                    },
                    {
                        label: 'Spanish (Español)',
                        name: 'spa'
                    },
                    {
                        label: 'Mandarin Chinese (普通话)',
                        name: 'cmn'
                    },
                    {
                        label: 'Hindi (हिन्दी)',
                        name: 'hin'
                    },
                    {
                        label: 'Arabic (اَلْعَرَبِيَّةُ)',
                        name: 'ara'
                    },
                    {
                        label: 'Portuguese (Português)',
                        name: 'por'
                    },
                    {
                        label: 'Bengali (বাংলা)',
                        name: 'ben'
                    },
                    {
                        label: 'Russian (Русский)',
                        name: 'rus'
                    },
                    {
                        label: 'Japanese (日本語)',
                        name: 'jpn'
                    },
                    {
                        label: 'Punjabi (ਪੰਜਾਬੀ)',
                        name: 'pan'
                    },
                    {
                        label: 'German (Deutsch)',
                        name: 'deu'
                    },
                    {
                        label: 'Korean (한국어)',
                        name: 'kor'
                    },
                    {
                        label: 'French (Français)',
                        name: 'fra'
                    },
                    {
                        label: 'Italian (Italiano)',
                        name: 'ita'
                    },
                    {
                        label: 'Vietnamese (Tiếng Việt)',
                        name: 'vie'
                    }
                ],
                optional: true,
                additionalParams: true
            },
            {
                label: 'Source ID Key',
                name: 'sourceIdKey',
                type: 'string',
                description: 'Key used to get the true source of document, to be compared against the record. Document metadata must contain the Source ID Key.',
                default: 'source',
                placeholder: 'source',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Coordinates',
                name: 'coordinates',
                type: 'boolean',
                description: 'If true, return coordinates for each element. Default: false.',
                optional: true,
                additionalParams: true,
                default: false
            },
            {
                label: 'XML Keep Tags',
                name: 'xmlKeepTags',
                description: 'If True, will retain the XML tags in the output. Otherwise it will simply extract the text from within the tags. Only applies to partition_xml.',
                type: 'boolean',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Include Page Breaks',
                name: 'includePageBreaks',
                description: 'When true, the output will include page break elements when the filetype supports it.',
                type: 'boolean',
                optional: true,
                additionalParams: true
            },
            {
                label: 'XML Keep Tags',
                name: 'xmlKeepTags',
                description: 'Whether to keep XML tags in the output.',
                type: 'boolean',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Multi-Page Sections',
                name: 'multiPageSections',
                description: 'Whether to treat multi-page documents as separate sections.',
                type: 'boolean',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Combine Under N Chars',
                name: 'combineUnderNChars',
                description: "If chunking strategy is set, combine elements until a section reaches a length of n chars. Default: value of max_characters. Can't exceed value of max_characters.",
                type: 'number',
                optional: true,
                additionalParams: true
            },
            {
                label: 'New After N Chars',
                name: 'newAfterNChars',
                description: "If chunking strategy is set, cut off new sections after reaching a length of n chars (soft max). value of max_characters. Can't exceed value of max_characters.",
                type: 'number',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Max Characters',
                name: 'maxCharacters',
                description: 'If chunking strategy is set, cut off new sections after reaching a length of n chars (hard max). Default: 500',
                type: 'number',
                optional: true,
                additionalParams: true,
                default: '500'
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
        const bucketName = nodeData.inputs?.bucketName;
        const keyName = nodeData.inputs?.keyName;
        const region = nodeData.inputs?.region;
        const unstructuredAPIUrl = nodeData.inputs?.unstructuredAPIUrl;
        const unstructuredAPIKey = nodeData.inputs?.unstructuredAPIKey;
        const strategy = nodeData.inputs?.strategy;
        const encoding = nodeData.inputs?.encoding;
        const coordinates = nodeData.inputs?.coordinates;
        const skipInferTableTypes = nodeData.inputs?.skipInferTableTypes
            ? JSON.parse(nodeData.inputs?.skipInferTableTypes)
            : [];
        const hiResModelName = nodeData.inputs?.hiResModelName;
        const includePageBreaks = nodeData.inputs?.includePageBreaks;
        const chunkingStrategy = nodeData.inputs?.chunkingStrategy;
        const metadata = nodeData.inputs?.metadata;
        const sourceIdKey = nodeData.inputs?.sourceIdKey || 'source';
        const ocrLanguages = nodeData.inputs?.ocrLanguages ? JSON.parse(nodeData.inputs?.ocrLanguages) : [];
        const xmlKeepTags = nodeData.inputs?.xmlKeepTags;
        const multiPageSections = nodeData.inputs?.multiPageSections;
        const combineUnderNChars = nodeData.inputs?.combineUnderNChars;
        const newAfterNChars = nodeData.inputs?.newAfterNChars;
        const maxCharacters = nodeData.inputs?.maxCharacters;
        const _omitMetadataKeys = nodeData.inputs?.omitMetadataKeys;
        const output = nodeData.outputs?.output;
        let omitMetadataKeys = [];
        if (_omitMetadataKeys) {
            omitMetadataKeys = _omitMetadataKeys.split(',').map((key) => key.trim());
        }
        let credentials;
        if (nodeData.credential) {
            const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential, options);
            const accessKeyId = (0, utils_1.getCredentialParam)('awsKey', credentialData, nodeData);
            const secretAccessKey = (0, utils_1.getCredentialParam)('awsSecret', credentialData, nodeData);
            if (accessKeyId && secretAccessKey) {
                credentials = {
                    accessKeyId,
                    secretAccessKey
                };
            }
        }
        const s3Config = {
            region,
            credentials
        };
        const loader = new s3_1.S3Loader({
            bucket: bucketName,
            key: keyName,
            s3Config,
            unstructuredAPIURL: unstructuredAPIUrl,
            unstructuredAPIKey: unstructuredAPIKey
        });
        loader.load = async () => {
            const tempDir = fsDefault.mkdtempSync(path.join(os.tmpdir(), 's3fileloader-'));
            const filePath = path.join(tempDir, keyName);
            try {
                const s3Client = new client_s3_1.S3Client(s3Config);
                const getObjectCommand = new client_s3_1.GetObjectCommand({
                    Bucket: bucketName,
                    Key: keyName
                });
                const response = await s3Client.send(getObjectCommand);
                const objectData = await new Promise((resolve, reject) => {
                    const chunks = [];
                    if (response.Body instanceof node_stream_1.Readable) {
                        response.Body.on('data', (chunk) => chunks.push(chunk));
                        response.Body.on('end', () => resolve(Buffer.concat(chunks)));
                        response.Body.on('error', reject);
                    }
                    else {
                        reject(new Error('Response body is not a readable stream.'));
                    }
                });
                fsDefault.mkdirSync(path.dirname(filePath), { recursive: true });
                fsDefault.writeFileSync(filePath, objectData);
            }
            catch (e) {
                throw new Error(`Failed to download file ${keyName} from S3 bucket ${bucketName}: ${e.message}`);
            }
            try {
                const obj = {
                    apiUrl: unstructuredAPIUrl,
                    strategy,
                    encoding,
                    coordinates,
                    skipInferTableTypes,
                    hiResModelName,
                    includePageBreaks,
                    chunkingStrategy,
                    ocrLanguages,
                    xmlKeepTags,
                    multiPageSections,
                    combineUnderNChars,
                    newAfterNChars,
                    maxCharacters
                };
                if (unstructuredAPIKey)
                    obj.apiKey = unstructuredAPIKey;
                const unstructuredLoader = new unstructured_1.UnstructuredLoader(filePath, obj);
                let docs = await unstructuredLoader.load();
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
                                ...parsedMetadata,
                                [sourceIdKey]: doc.metadata[sourceIdKey] || sourceIdKey
                            }, omitMetadataKeys)
                    }));
                }
                else {
                    docs = docs.map((doc) => ({
                        ...doc,
                        metadata: _omitMetadataKeys === '*'
                            ? {}
                            : (0, lodash_1.omit)({
                                ...doc.metadata,
                                [sourceIdKey]: doc.metadata[sourceIdKey] || sourceIdKey
                            }, omitMetadataKeys)
                    }));
                }
                fsDefault.rmSync(path.dirname(filePath), { recursive: true });
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
            catch {
                fsDefault.rmSync(path.dirname(filePath), { recursive: true });
                throw new Error(`Failed to load file ${filePath} using unstructured loader.`);
            }
        };
        return loader.load();
    }
}
module.exports = { nodeClass: S3_DocumentLoaders };
//# sourceMappingURL=S3File.js.map