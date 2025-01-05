"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelLoader_1 = require("../../../src/modelLoader");
const utils_1 = require("../../../src/utils");
const llamaindex_1 = require("llamaindex");
class ChatGroq_LlamaIndex_ChatModels {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.CHAT, 'groqChat');
            }
        };
        this.label = 'ChatGroq';
        this.name = 'chatGroq_LlamaIndex';
        this.version = 1.0;
        this.type = 'ChatGroq';
        this.icon = 'groq.png';
        this.category = 'Chat Models';
        this.description = 'Wrapper around Groq LLM specific for LlamaIndex';
        this.baseClasses = [this.type, 'BaseChatModel_LlamaIndex', ...(0, utils_1.getBaseClasses)(llamaindex_1.Groq)];
        this.tags = ['LlamaIndex'];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['groqApi'],
            optional: true
        };
        this.inputs = [
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'asyncOptions',
                loadMethod: 'listModels',
                placeholder: 'llama3-70b-8192'
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.9,
                optional: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const temperature = nodeData.inputs?.temperature;
        const modelName = nodeData.inputs?.modelName;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const groqApiKey = (0, utils_1.getCredentialParam)('groqApiKey', credentialData, nodeData);
        const obj = {
            temperature: parseFloat(temperature),
            model: modelName,
            apiKey: groqApiKey
        };
        const model = new llamaindex_1.Groq(obj);
        return model;
    }
}
module.exports = { nodeClass: ChatGroq_LlamaIndex_ChatModels };
//# sourceMappingURL=ChatGroq_LlamaIndex.js.map