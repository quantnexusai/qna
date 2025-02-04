"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("@langchain/openai");
const utils_1 = require("../../../src/utils");
const FlowiseChatOpenAI_1 = require("../ChatOpenAI/FlowiseChatOpenAI");
const modelLoader_1 = require("../../../src/modelLoader");
const serverCredentialsExists = !!process.env.AZURE_OPENAI_API_KEY &&
    !!process.env.AZURE_OPENAI_API_INSTANCE_NAME &&
    !!process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME &&
    !!process.env.AZURE_OPENAI_API_VERSION;
class AzureChatOpenAI_ChatModels {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.CHAT, 'azureChatOpenAI');
            }
        };
        this.label = 'Azure ChatOpenAI';
        this.name = 'azureChatOpenAI';
        this.version = 7.0;
        this.type = 'AzureChatOpenAI';
        this.icon = 'Azure.svg';
        this.category = 'Chat Models';
        this.description = 'Wrapper around Azure OpenAI large language models that use the Chat endpoint';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(openai_1.ChatOpenAI)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['azureOpenAIApi'],
            optional: serverCredentialsExists
        };
        this.inputs = [
            {
                label: 'Cache',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'asyncOptions',
                loadMethod: 'listModels'
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.9,
                optional: true
            },
            {
                label: 'Max Tokens',
                name: 'maxTokens',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Streaming',
                name: 'streaming',
                type: 'boolean',
                default: true,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Top Probability',
                name: 'topP',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Frequency Penalty',
                name: 'frequencyPenalty',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Presence Penalty',
                name: 'presencePenalty',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Timeout',
                name: 'timeout',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'BasePath',
                name: 'basepath',
                type: 'string',
                optional: true,
                additionalParams: true
            },
            {
                label: 'BaseOptions',
                name: 'baseOptions',
                type: 'json',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Allow Image Uploads',
                name: 'allowImageUploads',
                type: 'boolean',
                description: 'Allow image input. Refer to the <a href="https://docs.flowiseai.com/using-flowise/uploads#image" target="_blank">docs</a> for more details.',
                default: false,
                optional: true
            },
            {
                label: 'Image Resolution',
                description: 'This parameter controls the resolution in which the model views the image.',
                name: 'imageResolution',
                type: 'options',
                options: [
                    {
                        label: 'Low',
                        name: 'low'
                    },
                    {
                        label: 'High',
                        name: 'high'
                    },
                    {
                        label: 'Auto',
                        name: 'auto'
                    }
                ],
                default: 'low',
                optional: false,
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const modelName = nodeData.inputs?.modelName;
        const temperature = nodeData.inputs?.temperature;
        const maxTokens = nodeData.inputs?.maxTokens;
        const frequencyPenalty = nodeData.inputs?.frequencyPenalty;
        const presencePenalty = nodeData.inputs?.presencePenalty;
        const timeout = nodeData.inputs?.timeout;
        const streaming = nodeData.inputs?.streaming;
        const cache = nodeData.inputs?.cache;
        const topP = nodeData.inputs?.topP;
        const basePath = nodeData.inputs?.basepath;
        const baseOptions = nodeData.inputs?.baseOptions;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const azureOpenAIApiKey = (0, utils_1.getCredentialParam)('azureOpenAIApiKey', credentialData, nodeData);
        const azureOpenAIApiInstanceName = (0, utils_1.getCredentialParam)('azureOpenAIApiInstanceName', credentialData, nodeData);
        const azureOpenAIApiDeploymentName = (0, utils_1.getCredentialParam)('azureOpenAIApiDeploymentName', credentialData, nodeData);
        const azureOpenAIApiVersion = (0, utils_1.getCredentialParam)('azureOpenAIApiVersion', credentialData, nodeData);
        const allowImageUploads = nodeData.inputs?.allowImageUploads;
        const imageResolution = nodeData.inputs?.imageResolution;
        const obj = {
            temperature: parseFloat(temperature),
            modelName,
            azureOpenAIApiKey,
            azureOpenAIApiInstanceName,
            azureOpenAIApiDeploymentName,
            azureOpenAIApiVersion,
            streaming: streaming ?? true
        };
        if (maxTokens)
            obj.maxTokens = parseInt(maxTokens, 10);
        if (frequencyPenalty)
            obj.frequencyPenalty = parseFloat(frequencyPenalty);
        if (presencePenalty)
            obj.presencePenalty = parseFloat(presencePenalty);
        if (timeout)
            obj.timeout = parseInt(timeout, 10);
        if (cache)
            obj.cache = cache;
        if (topP)
            obj.topP = parseFloat(topP);
        if (basePath)
            obj.azureOpenAIBasePath = basePath;
        if (baseOptions) {
            try {
                const parsedBaseOptions = typeof baseOptions === 'object' ? baseOptions : JSON.parse(baseOptions);
                obj.configuration = {
                    defaultHeaders: parsedBaseOptions
                };
            }
            catch (exception) {
                console.error('Error parsing base options', exception);
            }
        }
        const multiModalOption = {
            image: {
                allowImageUploads: allowImageUploads ?? false,
                imageResolution
            }
        };
        const model = new FlowiseChatOpenAI_1.ChatOpenAI(nodeData.id, obj);
        model.setMultiModalOption(multiModalOption);
        return model;
    }
}
module.exports = { nodeClass: AzureChatOpenAI_ChatModels };
//# sourceMappingURL=AzureChatOpenAI.js.map