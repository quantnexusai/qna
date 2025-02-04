"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const llamaindex_1 = require("llamaindex");
const utils_1 = require("../../../../src/utils");
class AnthropicAgent_LlamaIndex_Agents {
    constructor(fields) {
        this.label = 'Anthropic Agent';
        this.name = 'anthropicAgentLlamaIndex';
        this.version = 1.0;
        this.type = 'AnthropicAgent';
        this.category = 'Agents';
        this.icon = 'Anthropic.svg';
        this.description = `Agent that uses Anthropic Claude Function Calling to pick the tools and args to call using LlamaIndex`;
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(llamaindex_1.AnthropicAgent)];
        this.tags = ['LlamaIndex'];
        this.inputs = [
            {
                label: 'Tools',
                name: 'tools',
                type: 'Tool_LlamaIndex',
                list: true
            },
            {
                label: 'Memory',
                name: 'memory',
                type: 'BaseChatMemory'
            },
            {
                label: 'Anthropic Claude Model',
                name: 'model',
                type: 'BaseChatModel_LlamaIndex'
            },
            {
                label: 'System Message',
                name: 'systemMessage',
                type: 'string',
                rows: 4,
                optional: true,
                additionalParams: true
            }
        ];
        this.sessionId = fields?.sessionId;
    }
    async init() {
        return null;
    }
    async run(nodeData, input, options) {
        const memory = nodeData.inputs?.memory;
        const model = nodeData.inputs?.model;
        const systemMessage = nodeData.inputs?.systemMessage;
        const prependMessages = options?.prependMessages;
        let tools = nodeData.inputs?.tools;
        tools = (0, lodash_1.flatten)(tools);
        const chatHistory = [];
        if (systemMessage) {
            chatHistory.push({
                content: systemMessage,
                role: 'system'
            });
        }
        const msgs = (await memory.getChatMessages(this.sessionId, false, prependMessages));
        for (const message of msgs) {
            if (message.type === 'apiMessage') {
                chatHistory.push({
                    content: message.message,
                    role: 'assistant'
                });
            }
            else if (message.type === 'userMessage') {
                chatHistory.push({
                    content: message.message,
                    role: 'user'
                });
            }
        }
        const agent = new llamaindex_1.AnthropicAgent({
            tools,
            llm: model,
            chatHistory: chatHistory,
            verbose: process.env.DEBUG === 'true'
        });
        let text = '';
        const usedTools = [];
        const response = await agent.chat({ message: input, chatHistory, verbose: process.env.DEBUG === 'true' });
        if (response.sources.length) {
            for (const sourceTool of response.sources) {
                usedTools.push({
                    tool: sourceTool.tool?.metadata.name ?? '',
                    toolInput: sourceTool.input,
                    toolOutput: sourceTool.output
                });
            }
        }
        if (Array.isArray(response.response.message.content) && response.response.message.content.length > 0) {
            text = response.response.message.content[0].text;
        }
        else {
            text = response.response.message.content;
        }
        await memory.addChatMessages([
            {
                text: input,
                type: 'userMessage'
            },
            {
                text: text,
                type: 'apiMessage'
            }
        ], this.sessionId);
        return usedTools.length ? { text: text, usedTools } : text;
    }
}
module.exports = { nodeClass: AnthropicAgent_LlamaIndex_Agents };
//# sourceMappingURL=AnthropicAgent_LlamaIndex.js.map