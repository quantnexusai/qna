"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interface_1 = require("../../../src/Interface");
const utils_1 = require("../../../src/utils");
const langfuse_1 = require("langfuse");
class PromptLangfuse_Prompts {
    constructor() {
        this.label = 'LangFuse Prompt Template';
        this.name = 'promptLangFuse';
        this.version = 1.0;
        this.type = 'PromptTemplate';
        this.icon = 'prompt.svg';
        this.category = 'Prompts';
        this.author = 'Lucas Cruz';
        this.description = 'Fetch schema from LangFuse to represent a prompt for an LLM';
        this.baseClasses = [...(0, utils_1.getBaseClasses)(Interface_1.PromptTemplate)];
        this.credential = {
            label: 'Langfuse Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['langfuseApi']
        };
        this.inputs = [
            {
                label: 'Prompt Name',
                name: 'template',
                type: 'string',
                placeholder: `Name of the template`
            },
            {
                label: 'Format Prompt Values',
                name: 'promptValues',
                type: 'json',
                optional: true,
                acceptVariable: true,
                list: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const langFuseSecretKey = (0, utils_1.getCredentialParam)('langFuseSecretKey', credentialData, nodeData);
        const langFusePublicKey = (0, utils_1.getCredentialParam)('langFusePublicKey', credentialData, nodeData);
        const langFuseEndpoint = (0, utils_1.getCredentialParam)('langFuseEndpoint', credentialData, nodeData);
        const langfuse = new langfuse_1.Langfuse({
            secretKey: langFuseSecretKey,
            publicKey: langFusePublicKey,
            baseUrl: langFuseEndpoint ?? 'https://cloud.langfuse.com',
            sdkIntegration: 'Flowise'
        });
        const langfusePrompt = await langfuse.getPrompt(nodeData.inputs?.template);
        let template = langfusePrompt.getLangchainPrompt();
        const promptValuesStr = nodeData.inputs?.promptValues;
        let promptValues = {};
        if (promptValuesStr) {
            try {
                promptValues = typeof promptValuesStr === 'object' ? promptValuesStr : JSON.parse(promptValuesStr);
            }
            catch (exception) {
                throw new Error("Invalid JSON in the PromptTemplate's promptValues: " + exception);
            }
        }
        const inputVariables = (0, utils_1.getInputVariables)(template);
        template = (0, utils_1.transformBracesWithColon)(template);
        try {
            const options = {
                template,
                inputVariables
            };
            const prompt = new Interface_1.PromptTemplate(options);
            prompt.promptValues = promptValues;
            return prompt;
        }
        catch (e) {
            throw new Error(e);
        }
    }
}
module.exports = { nodeClass: PromptLangfuse_Prompts };
//# sourceMappingURL=PromptLangfuse.js.map