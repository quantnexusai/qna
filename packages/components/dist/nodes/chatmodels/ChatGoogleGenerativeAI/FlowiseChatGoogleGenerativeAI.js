"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGoogleGenerativeAI = void 0;
const messages_1 = require("@langchain/core/messages");
const chat_models_1 = require("@langchain/core/language_models/chat_models");
const outputs_1 = require("@langchain/core/outputs");
const generative_ai_1 = require("@google/generative-ai");
const function_calling_1 = require("@langchain/core/utils/function_calling");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const DEFAULT_IMAGE_MAX_TOKEN = 8192;
const DEFAULT_IMAGE_MODEL = 'gemini-1.5-flash-latest';
class LangchainChatGoogleGenerativeAI extends chat_models_1.BaseChatModel {
    get _isMultimodalModel() {
        return this.modelName.includes('vision') || this.modelName.startsWith('gemini-1.5');
    }
    constructor(fields) {
        super(fields ?? {});
        this.modelName = 'gemini-pro';
        this.stopSequences = [];
        this.streaming = false;
        this.streamUsage = true;
        this.modelName = fields?.model?.replace(/^models\//, '') ?? fields?.modelName?.replace(/^models\//, '') ?? 'gemini-pro';
        this.maxOutputTokens = fields?.maxOutputTokens ?? this.maxOutputTokens;
        if (this.maxOutputTokens && this.maxOutputTokens < 0) {
            throw new Error('`maxOutputTokens` must be a positive integer');
        }
        this.temperature = fields?.temperature ?? this.temperature;
        if (this.temperature && (this.temperature < 0 || this.temperature > 1)) {
            throw new Error('`temperature` must be in the range of [0.0,1.0]');
        }
        this.topP = fields?.topP ?? this.topP;
        if (this.topP && this.topP < 0) {
            throw new Error('`topP` must be a positive integer');
        }
        if (this.topP && this.topP > 1) {
            throw new Error('`topP` must be below 1.');
        }
        this.topK = fields?.topK ?? this.topK;
        if (this.topK && this.topK < 0) {
            throw new Error('`topK` must be a positive integer');
        }
        this.stopSequences = fields?.stopSequences ?? this.stopSequences;
        this.apiKey = fields?.apiKey ?? process.env['GOOGLE_API_KEY'];
        if (!this.apiKey) {
            throw new Error('Please set an API key for Google GenerativeAI ' +
                'in the environment variable GOOGLE_API_KEY ' +
                'or in the `apiKey` field of the ' +
                'ChatGoogleGenerativeAI constructor');
        }
        this.safetySettings = fields?.safetySettings ?? this.safetySettings;
        if (this.safetySettings && this.safetySettings.length > 0) {
            const safetySettingsSet = new Set(this.safetySettings.map((s) => s.category));
            if (safetySettingsSet.size !== this.safetySettings.length) {
                throw new Error('The categories in `safetySettings` array must be unique');
            }
        }
        this.streaming = fields?.streaming ?? this.streaming;
        this.streamUsage = fields?.streamUsage ?? this.streamUsage;
        this.getClient();
    }
    getClient(tools) {
        this.client = new generative_ai_1.GoogleGenerativeAI(this.apiKey ?? '').getGenerativeModel({
            model: this.modelName,
            tools,
            safetySettings: this.safetySettings,
            generationConfig: {
                candidateCount: 1,
                stopSequences: this.stopSequences,
                maxOutputTokens: this.maxOutputTokens,
                temperature: this.temperature,
                topP: this.topP,
                topK: this.topK
            }
        });
    }
    _combineLLMOutput() {
        return [];
    }
    _llmType() {
        return 'googlegenerativeai';
    }
    bindTools(tools, kwargs) {
        //@ts-ignore
        return this.bind({ tools: convertToGeminiTools(tools), ...kwargs });
    }
    invocationParams(options) {
        const tools = options?.tools;
        if (Array.isArray(tools) && !tools.some((t) => !('lc_namespace' in t))) {
            return {
                tools: convertToGeminiTools(options?.tools)
            };
        }
        return {
            tools: options?.tools
        };
    }
    convertFunctionResponse(prompts) {
        for (let i = 0; i < prompts.length; i += 1) {
            if (prompts[i].role === 'function') {
                if (prompts[i - 1].role === 'model') {
                    const toolName = prompts[i - 1].parts[0].functionCall?.name ?? '';
                    prompts[i].parts = [
                        {
                            functionResponse: {
                                name: toolName,
                                response: {
                                    name: toolName,
                                    content: prompts[i].parts[0].text
                                }
                            }
                        }
                    ];
                }
            }
        }
    }
    async _generateNonStreaming(prompt, options, _runManager) {
        //@ts-ignore
        const tools = options.tools ?? [];
        this.convertFunctionResponse(prompt);
        if (tools.length > 0) {
            this.getClient(tools);
        }
        else {
            this.getClient();
        }
        const res = await this.caller.callWithOptions({ signal: options?.signal }, async () => {
            let output;
            try {
                output = await this.client.generateContent({
                    contents: prompt
                });
            }
            catch (e) {
                if (e.message?.includes('400 Bad Request')) {
                    e.status = 400;
                }
                throw e;
            }
            return output;
        });
        const generationResult = mapGenerateContentResultToChatResult(res.response);
        await _runManager?.handleLLMNewToken(generationResult.generations?.length ? generationResult.generations[0].text : '');
        return generationResult;
    }
    async _generate(messages, options, runManager) {
        let prompt = convertBaseMessagesToContent(messages, this._isMultimodalModel);
        prompt = checkIfEmptyContentAndSameRole(prompt);
        // Handle streaming
        if (this.streaming) {
            const tokenUsage = {};
            const stream = this._streamResponseChunks(messages, options, runManager);
            const finalChunks = {};
            for await (const chunk of stream) {
                const index = chunk.generationInfo?.completion ?? 0;
                if (finalChunks[index] === undefined) {
                    finalChunks[index] = chunk;
                }
                else {
                    finalChunks[index] = finalChunks[index].concat(chunk);
                }
            }
            const generations = Object.entries(finalChunks)
                .sort(([aKey], [bKey]) => parseInt(aKey, 10) - parseInt(bKey, 10))
                .map(([_, value]) => value);
            return { generations, llmOutput: { estimatedTokenUsage: tokenUsage } };
        }
        return this._generateNonStreaming(prompt, options, runManager);
    }
    async *_streamResponseChunks(messages, options, runManager) {
        let prompt = convertBaseMessagesToContent(messages, this._isMultimodalModel);
        prompt = checkIfEmptyContentAndSameRole(prompt);
        const parameters = this.invocationParams(options);
        const request = {
            ...parameters,
            contents: prompt
        };
        const tools = options.tools ?? [];
        if (tools.length > 0) {
            this.getClient(tools);
        }
        else {
            this.getClient();
        }
        const stream = await this.caller.callWithOptions({ signal: options?.signal }, async () => {
            const { stream } = await this.client.generateContentStream(request);
            return stream;
        });
        let usageMetadata;
        let index = 0;
        for await (const response of stream) {
            if ('usageMetadata' in response && this.streamUsage !== false && options.streamUsage !== false) {
                const genAIUsageMetadata = response.usageMetadata;
                if (!usageMetadata) {
                    usageMetadata = {
                        input_tokens: genAIUsageMetadata.promptTokenCount,
                        output_tokens: genAIUsageMetadata.candidatesTokenCount,
                        total_tokens: genAIUsageMetadata.totalTokenCount
                    };
                }
                else {
                    // Under the hood, LangChain combines the prompt tokens. Google returns the updated
                    // total each time, so we need to find the difference between the tokens.
                    const outputTokenDiff = genAIUsageMetadata.candidatesTokenCount - usageMetadata.output_tokens;
                    usageMetadata = {
                        input_tokens: 0,
                        output_tokens: outputTokenDiff,
                        total_tokens: outputTokenDiff
                    };
                }
            }
            const chunk = convertResponseContentToChatGenerationChunk(response, {
                usageMetadata: usageMetadata,
                index
            });
            index += 1;
            if (!chunk) {
                continue;
            }
            yield chunk;
            await runManager?.handleLLMNewToken(chunk.text ?? '');
        }
    }
}
class ChatGoogleGenerativeAI extends LangchainChatGoogleGenerativeAI {
    constructor(id, fields) {
        super(fields);
        this.id = id;
        this.configuredModel = fields?.modelName ?? '';
        this.configuredMaxToken = fields?.maxOutputTokens;
    }
    revertToOriginalModel() {
        this.modelName = this.configuredModel;
        this.maxOutputTokens = this.configuredMaxToken;
    }
    setMultiModalOption(multiModalOption) {
        this.multiModalOption = multiModalOption;
    }
    setVisionModel() {
        if (this.modelName === 'gemini-1.0-pro-latest') {
            this.modelName = DEFAULT_IMAGE_MODEL;
            this.maxOutputTokens = this.configuredMaxToken ? this.configuredMaxToken : DEFAULT_IMAGE_MAX_TOKEN;
        }
    }
}
exports.ChatGoogleGenerativeAI = ChatGoogleGenerativeAI;
function messageContentMedia(content) {
    if ('mimeType' in content && 'data' in content) {
        return {
            inlineData: {
                mimeType: content.mimeType,
                data: content.data
            }
        };
    }
    throw new Error('Invalid media content');
}
function getMessageAuthor(message) {
    const type = message._getType();
    if (messages_1.ChatMessage.isInstance(message)) {
        return message.role;
    }
    return message.name ?? type;
}
function convertAuthorToRole(author) {
    switch (author) {
        /**
         *  Note: Gemini currently is not supporting system messages
         *  we will convert them to human messages and merge with following
         * */
        case 'ai':
        case 'model': // getMessageAuthor returns message.name. code ex.: return message.name ?? type;
            return 'model';
        case 'system':
        case 'human':
            return 'user';
        case 'function':
        case 'tool':
            return 'function';
        default:
            // Instead of throwing, we return model (Needed for Multi Agent)
            // throw new Error(`Unknown / unsupported author: ${author}`)
            return 'model';
    }
}
function convertMessageContentToParts(message, isMultimodalModel) {
    if (typeof message.content === 'string' && message.content !== '') {
        return [{ text: message.content }];
    }
    let functionCalls = [];
    let functionResponses = [];
    let messageParts = [];
    if ('tool_calls' in message && Array.isArray(message.tool_calls) && message.tool_calls.length > 0) {
        functionCalls = message.tool_calls.map((tc) => ({
            functionCall: {
                name: tc.name,
                args: tc.args
            }
        }));
    }
    else if (message._getType() === 'tool' && message.name && message.content) {
        functionResponses = [
            {
                functionResponse: {
                    name: message.name,
                    response: message.content
                }
            }
        ];
    }
    else if (Array.isArray(message.content)) {
        messageParts = message.content.map((c) => {
            if (c.type === 'text') {
                return {
                    text: c.text
                };
            }
            if (c.type === 'image_url') {
                if (!isMultimodalModel) {
                    throw new Error(`This model does not support images`);
                }
                let source;
                if (typeof c.image_url === 'string') {
                    source = c.image_url;
                }
                else if (typeof c.image_url === 'object' && 'url' in c.image_url) {
                    source = c.image_url.url;
                }
                else {
                    throw new Error('Please provide image as base64 encoded data URL');
                }
                const [dm, data] = source.split(',');
                if (!dm.startsWith('data:')) {
                    throw new Error('Please provide image as base64 encoded data URL');
                }
                const [mimeType, encoding] = dm.replace(/^data:/, '').split(';');
                if (encoding !== 'base64') {
                    throw new Error('Please provide image as base64 encoded data URL');
                }
                return {
                    inlineData: {
                        data,
                        mimeType
                    }
                };
            }
            else if (c.type === 'media') {
                return messageContentMedia(c);
            }
            else if (c.type === 'tool_use') {
                return {
                    functionCall: {
                        name: c.name,
                        args: c.input
                    }
                };
            }
            throw new Error(`Unknown content type ${c.type}`);
        });
    }
    return [...messageParts, ...functionCalls, ...functionResponses];
}
/*
 * This is a dedicated logic for Multi Agent Supervisor to handle the case where the content is empty, and the role is the same
 */
function checkIfEmptyContentAndSameRole(contents) {
    let prevRole = '';
    const removedContents = [];
    for (const content of contents) {
        const role = content.role;
        if (content.parts.length && content.parts[0].text === '' && role === prevRole) {
            removedContents.push(content);
        }
        prevRole = role;
    }
    return contents.filter((content) => !removedContents.includes(content));
}
function convertBaseMessagesToContent(messages, isMultimodalModel) {
    return messages.reduce((acc, message, index) => {
        if (!(0, messages_1.isBaseMessage)(message)) {
            throw new Error('Unsupported message input');
        }
        const author = getMessageAuthor(message);
        if (author === 'system' && index !== 0) {
            throw new Error('System message should be the first one');
        }
        const role = convertAuthorToRole(author);
        const prevContent = acc.content[acc.content.length];
        if (!acc.mergeWithPreviousContent && prevContent && prevContent.role === role) {
            throw new Error('Google Generative AI requires alternate messages between authors');
        }
        const parts = convertMessageContentToParts(message, isMultimodalModel);
        if (acc.mergeWithPreviousContent) {
            const prevContent = acc.content[acc.content.length - 1];
            if (!prevContent) {
                throw new Error('There was a problem parsing your system message. Please try a prompt without one.');
            }
            prevContent.parts.push(...parts);
            return {
                mergeWithPreviousContent: false,
                content: acc.content
            };
        }
        let actualRole = role;
        if (actualRole === 'function') {
            // GenerativeAI API will throw an error if the role is not "user" or "model."
            actualRole = 'user';
        }
        const content = {
            role: actualRole,
            parts
        };
        return {
            mergeWithPreviousContent: author === 'system',
            content: [...acc.content, content]
        };
    }, { content: [], mergeWithPreviousContent: false }).content;
}
function mapGenerateContentResultToChatResult(response, extra) {
    // if rejected or error, return empty generations with reason in filters
    if (!response.candidates || response.candidates.length === 0 || !response.candidates[0]) {
        return {
            generations: [],
            llmOutput: {
                filters: response.promptFeedback
            }
        };
    }
    const functionCalls = response.functionCalls();
    const [candidate] = response.candidates;
    const { content, ...generationInfo } = candidate;
    const text = content?.parts[0]?.text ?? '';
    const generation = {
        text,
        message: new messages_1.AIMessage({
            content: text,
            tool_calls: functionCalls,
            additional_kwargs: {
                ...generationInfo
            },
            usage_metadata: extra?.usageMetadata
        }),
        generationInfo
    };
    return {
        generations: [generation]
    };
}
function convertResponseContentToChatGenerationChunk(response, extra) {
    if (!response || !response.candidates || response.candidates.length === 0) {
        return null;
    }
    const functionCalls = response.functionCalls();
    const [candidate] = response.candidates;
    const { content, ...generationInfo } = candidate;
    const text = content?.parts?.[0]?.text ?? '';
    const toolCallChunks = [];
    if (functionCalls) {
        toolCallChunks.push(...functionCalls.map((fc) => ({
            ...fc,
            args: JSON.stringify(fc.args),
            index: extra.index
        })));
    }
    return new outputs_1.ChatGenerationChunk({
        text,
        message: new messages_1.AIMessageChunk({
            content: text,
            name: !content ? undefined : content.role,
            tool_call_chunks: toolCallChunks,
            // Each chunk can have unique "generationInfo", and merging strategy is unclear,
            // so leave blank for now.
            additional_kwargs: {},
            usage_metadata: extra.usageMetadata
        }),
        generationInfo
    });
}
function zodToGeminiParameters(zodObj) {
    // Gemini doesn't accept either the $schema or additionalProperties
    // attributes, so we need to explicitly remove them.
    const jsonSchema = (0, zod_to_json_schema_1.zodToJsonSchema)(zodObj);
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { $schema, additionalProperties, ...rest } = jsonSchema;
    if (rest.properties) {
        Object.keys(rest.properties).forEach((key) => {
            if (rest.properties[key].enum?.length) {
                rest.properties[key] = { type: 'string', format: 'enum', enum: rest.properties[key].enum };
            }
        });
    }
    return rest;
}
function convertToGeminiTools(structuredTools) {
    return [
        {
            functionDeclarations: structuredTools.map((structuredTool) => {
                if ((0, function_calling_1.isStructuredTool)(structuredTool)) {
                    const jsonSchema = zodToGeminiParameters(structuredTool.schema);
                    return {
                        name: structuredTool.name,
                        description: structuredTool.description,
                        parameters: jsonSchema
                    };
                }
                return structuredTool;
            })
        }
    ];
}
//# sourceMappingURL=FlowiseChatGoogleGenerativeAI.js.map