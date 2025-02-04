"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const messages_1 = require("@langchain/core/messages");
const prompts_1 = require("@langchain/core/prompts");
const runnables_1 = require("@langchain/core/runnables");
const agents_1 = require("langchain/agents");
const utils_1 = require("../../../src/utils");
const handler_1 = require("../../../src/handler");
const agents_2 = require("../../../src/agents");
const multiModalUtils_1 = require("../../../src/multiModalUtils");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
const DEFAULT_PREFIX = `Assistant is a large language model trained by OpenAI.

Assistant is designed to be able to assist with a wide range of tasks, from answering simple questions to providing in-depth explanations and discussions on a wide range of topics. As a language model, Assistant is able to generate human-like text based on the input it receives, allowing it to engage in natural-sounding conversations and provide responses that are coherent and relevant to the topic at hand.

Assistant is constantly learning and improving, and its capabilities are constantly evolving. It is able to process and understand large amounts of text, and can use this knowledge to provide accurate and informative responses to a wide range of questions. Additionally, Assistant is able to generate its own text based on the input it receives, allowing it to engage in discussions and provide explanations and descriptions on a wide range of topics.

Overall, Assistant is a powerful system that can help with a wide range of tasks and provide valuable insights and information on a wide range of topics. Whether you need help with a specific question or just want to have a conversation about a particular topic, Assistant is here to assist.`;
const TEMPLATE_TOOL_RESPONSE = `TOOL RESPONSE:
---------------------
{observation}

USER'S INPUT
--------------------

Okay, so what is the response to my last comment? If using information obtained from the tools you must mention it explicitly without mentioning the tool names - I have forgotten all TOOL RESPONSES! Remember to respond with a markdown code snippet of a json blob with a single action, and NOTHING else.`;
class ConversationalAgent_Agents {
    constructor(fields) {
        this.label = 'Conversational Agent';
        this.name = 'conversationalAgent';
        this.version = 3.0;
        this.type = 'AgentExecutor';
        this.category = 'Agents';
        this.icon = 'agent.svg';
        this.description = 'Conversational agent for a chat model. It will utilize chat specific prompts';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(agents_2.AgentExecutor)];
        this.inputs = [
            {
                label: 'Allowed Tools',
                name: 'tools',
                type: 'Tool',
                list: true
            },
            {
                label: 'Chat Model',
                name: 'model',
                type: 'BaseChatModel'
            },
            {
                label: 'Memory',
                name: 'memory',
                type: 'BaseChatMemory'
            },
            {
                label: 'System Message',
                name: 'systemMessage',
                type: 'string',
                rows: 4,
                default: DEFAULT_PREFIX,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Input Moderation',
                description: 'Detect text that could generate harmful output and prevent it from being sent to the language model',
                name: 'inputModeration',
                type: 'Moderation',
                optional: true,
                list: true
            },
            {
                label: 'Max Iterations',
                name: 'maxIterations',
                type: 'number',
                optional: true,
                additionalParams: true
            }
        ];
        this.sessionId = fields?.sessionId;
    }
    async init(nodeData, input, options) {
        return prepareAgent(nodeData, options, { sessionId: this.sessionId, chatId: options.chatId, input });
    }
    async run(nodeData, input, options) {
        const memory = nodeData.inputs?.memory;
        const moderations = nodeData.inputs?.inputModeration;
        const shouldStreamResponse = options.shouldStreamResponse;
        const sseStreamer = options.sseStreamer;
        const chatId = options.chatId;
        if (moderations && moderations.length > 0) {
            try {
                // Use the output of the moderation chain as input for the BabyAGI agent
                input = await (0, Moderation_1.checkInputs)(moderations, input);
            }
            catch (e) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                if (options.shouldStreamResponse) {
                    (0, Moderation_1.streamResponse)(sseStreamer, chatId, e.message);
                }
                return (0, OutputParserHelpers_1.formatResponse)(e.message);
            }
        }
        const executor = await prepareAgent(nodeData, options, { sessionId: this.sessionId, chatId: options.chatId, input });
        const loggerHandler = new handler_1.ConsoleCallbackHandler(options.logger);
        const callbacks = await (0, handler_1.additionalCallbacks)(nodeData, options);
        let res = {};
        let sourceDocuments = [];
        let usedTools = [];
        if (options.shouldStreamResponse) {
            const handler = new handler_1.CustomChainHandler(shouldStreamResponse ? sseStreamer : undefined, chatId);
            res = await executor.invoke({ input }, { callbacks: [loggerHandler, handler, ...callbacks] });
            if (res.sourceDocuments) {
                if (options.sseStreamer) {
                    sseStreamer.streamSourceDocumentsEvent(options.chatId, (0, lodash_1.flatten)(res.sourceDocuments));
                }
                sourceDocuments = res.sourceDocuments;
            }
            if (res.usedTools) {
                sseStreamer.streamUsedToolsEvent(options.chatId, res.usedTools);
                usedTools = res.usedTools;
            }
            // If the tool is set to returnDirect, stream the output to the client
            if (res.usedTools && res.usedTools.length) {
                let inputTools = nodeData.inputs?.tools;
                inputTools = (0, lodash_1.flatten)(inputTools);
                for (const tool of res.usedTools) {
                    const inputTool = inputTools.find((inputTool) => inputTool.name === tool.tool);
                    if (inputTool && inputTool.returnDirect && options.sseStreamer) {
                        sseStreamer.streamTokenEvent(options.chatId, tool.toolOutput);
                    }
                }
            }
            if (sseStreamer) {
                sseStreamer.streamEndEvent(options.chatId);
            }
        }
        else {
            res = await executor.invoke({ input }, { callbacks: [loggerHandler, ...callbacks] });
            if (res.sourceDocuments) {
                sourceDocuments = res.sourceDocuments;
            }
            if (res.usedTools) {
                usedTools = res.usedTools;
            }
        }
        await memory.addChatMessages([
            {
                text: input,
                type: 'userMessage'
            },
            {
                text: res?.output,
                type: 'apiMessage'
            }
        ], this.sessionId);
        let finalRes = res?.output;
        if (sourceDocuments.length || usedTools.length) {
            finalRes = { text: res?.output };
            if (sourceDocuments.length) {
                finalRes.sourceDocuments = (0, lodash_1.flatten)(sourceDocuments);
            }
            if (usedTools.length) {
                finalRes.usedTools = usedTools;
            }
            return finalRes;
        }
        return finalRes;
    }
}
const prepareAgent = async (nodeData, options, flowObj) => {
    const model = nodeData.inputs?.model;
    const maxIterations = nodeData.inputs?.maxIterations;
    let tools = nodeData.inputs?.tools;
    tools = (0, lodash_1.flatten)(tools);
    const memory = nodeData.inputs?.memory;
    let systemMessage = nodeData.inputs?.systemMessage;
    const memoryKey = memory.memoryKey ? memory.memoryKey : 'chat_history';
    const inputKey = memory.inputKey ? memory.inputKey : 'input';
    const prependMessages = options?.prependMessages;
    const outputParser = agents_1.ChatConversationalAgent.getDefaultOutputParser({
        llm: model,
        toolNames: tools.map((tool) => tool.name)
    });
    systemMessage = (0, utils_1.transformBracesWithColon)(systemMessage);
    const prompt = agents_1.ChatConversationalAgent.createPrompt(tools, {
        systemMessage: systemMessage ? systemMessage : DEFAULT_PREFIX,
        outputParser
    });
    if ((0, multiModalUtils_1.llmSupportsVision)(model)) {
        const visionChatModel = model;
        const messageContent = await (0, multiModalUtils_1.addImagesToMessages)(nodeData, options, model.multiModalOption);
        if (messageContent?.length) {
            visionChatModel.setVisionModel();
            // Pop the `agent_scratchpad` MessagePlaceHolder
            let messagePlaceholder = prompt.promptMessages.pop();
            if (prompt.promptMessages.at(-1) instanceof prompts_1.HumanMessagePromptTemplate) {
                const lastMessage = prompt.promptMessages.pop();
                const template = lastMessage.prompt.template;
                const msg = prompts_1.HumanMessagePromptTemplate.fromTemplate([
                    ...messageContent,
                    {
                        text: template
                    }
                ]);
                msg.inputVariables = lastMessage.inputVariables;
                prompt.promptMessages.push(msg);
            }
            // Add the `agent_scratchpad` MessagePlaceHolder back
            prompt.promptMessages.push(messagePlaceholder);
        }
        else {
            visionChatModel.revertToOriginalModel();
        }
    }
    /** Bind a stop token to the model */
    const modelWithStop = model.bind({
        stop: ['\nObservation']
    });
    const runnableAgent = runnables_1.RunnableSequence.from([
        {
            [inputKey]: (i) => i.input,
            agent_scratchpad: async (i) => await constructScratchPad(i.steps),
            [memoryKey]: async (_) => {
                const messages = (await memory.getChatMessages(flowObj?.sessionId, true, prependMessages));
                return messages ?? [];
            }
        },
        prompt,
        modelWithStop,
        outputParser
    ]);
    const executor = agents_2.AgentExecutor.fromAgentAndTools({
        agent: runnableAgent,
        tools,
        sessionId: flowObj?.sessionId,
        chatId: flowObj?.chatId,
        input: flowObj?.input,
        verbose: process.env.DEBUG === 'true',
        maxIterations: maxIterations ? parseFloat(maxIterations) : undefined
    });
    return executor;
};
const constructScratchPad = async (steps) => {
    const thoughts = [];
    for (const step of steps) {
        thoughts.push(new messages_1.AIMessage(step.action.log));
        thoughts.push(new messages_1.HumanMessage((0, prompts_1.renderTemplate)(TEMPLATE_TOOL_RESPONSE, 'f-string', {
            observation: step.observation
        })));
    }
    return thoughts;
};
module.exports = { nodeClass: ConversationalAgent_Agents };
//# sourceMappingURL=ConversationalAgent.js.map