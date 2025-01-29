"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodevm_1 = require("@flowiseai/nodevm");
const utils_1 = require("../../../src/utils");
const messages_1 = require("@langchain/core/messages");
const uuid_1 = require("uuid");
class ExecuteFlow_SeqAgents {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listFlows(_, options) {
                const returnData = [];
                const appDataSource = options.appDataSource;
                const databaseEntities = options.databaseEntities;
                if (appDataSource === undefined || !appDataSource) {
                    return returnData;
                }
                const chatflows = await appDataSource.getRepository(databaseEntities['ChatFlow']).find();
                for (let i = 0; i < chatflows.length; i += 1) {
                    const data = {
                        label: chatflows[i].name,
                        name: chatflows[i].id
                    };
                    returnData.push(data);
                }
                return returnData;
            }
        };
        this.label = 'Execute Flow';
        this.name = 'seqExecuteFlow';
        this.version = 1.0;
        this.type = 'ExecuteFlow';
        this.icon = 'executeflow.svg';
        this.category = 'Sequential Agents';
        this.description = `Execute chatflow/agentflow and return final response`;
        this.baseClasses = [this.type];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['chatflowApi'],
            optional: true
        };
        this.inputs = [
            {
                label: 'Sequential Node',
                name: 'sequentialNode',
                type: 'Start | Agent | Condition | LLMNode | ToolNode | CustomFunction | ExecuteFlow',
                description: 'Can be connected to one of the following nodes: Start, Agent, Condition, LLM Node, Tool Node, Custom Function, Execute Flow',
                list: true
            },
            {
                label: 'Name',
                name: 'seqExecuteFlowName',
                type: 'string'
            },
            {
                label: 'Select Flow',
                name: 'selectedFlow',
                type: 'asyncOptions',
                loadMethod: 'listFlows'
            },
            {
                label: 'Input',
                name: 'seqExecuteFlowInput',
                type: 'options',
                description: 'Select one of the following or enter custom input',
                freeSolo: true,
                loadPreviousNodes: true,
                options: [
                    {
                        label: '{{ question }}',
                        name: 'userQuestion',
                        description: 'Use the user question from the chat as input.'
                    }
                ]
            },
            {
                label: 'Override Config',
                name: 'overrideConfig',
                description: 'Override the config passed to the flow.',
                type: 'json',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Base URL',
                name: 'baseURL',
                type: 'string',
                description: 'Base URL to Flowise. By default, it is the URL of the incoming request. Useful when you need to execute flow through an alternative route.',
                placeholder: 'http://localhost:3000',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Start new session per message',
                name: 'startNewSession',
                type: 'boolean',
                description: 'Whether to continue the session or start a new one with each interaction. Useful for flows with memory if you want to avoid it.',
                default: false,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Return Value As',
                name: 'returnValueAs',
                type: 'options',
                options: [
                    { label: 'AI Message', name: 'aiMessage' },
                    { label: 'Human Message', name: 'humanMessage' },
                    {
                        label: 'State Object',
                        name: 'stateObj',
                        description: "Return as state object, ex: { foo: bar }. This will update the custom state 'foo' to 'bar'"
                    }
                ],
                default: 'aiMessage'
            }
        ];
    }
    async init(nodeData, input, options) {
        const selectedFlowId = nodeData.inputs?.selectedFlow;
        const _seqExecuteFlowName = nodeData.inputs?.seqExecuteFlowName;
        if (!_seqExecuteFlowName)
            throw new Error('Execute Flow node name is required!');
        const seqExecuteFlowName = _seqExecuteFlowName.toLowerCase().replace(/\s/g, '_').trim();
        const startNewSession = nodeData.inputs?.startNewSession;
        const appDataSource = options.appDataSource;
        const databaseEntities = options.databaseEntities;
        const sequentialNodes = nodeData.inputs?.sequentialNode;
        const seqExecuteFlowInput = nodeData.inputs?.seqExecuteFlowInput;
        const overrideConfig = typeof nodeData.inputs?.overrideConfig === 'string' &&
            nodeData.inputs.overrideConfig.startsWith('{') &&
            nodeData.inputs.overrideConfig.endsWith('}')
            ? JSON.parse(nodeData.inputs.overrideConfig)
            : nodeData.inputs?.overrideConfig;
        if (!sequentialNodes || !sequentialNodes.length)
            throw new Error('Execute Flow must have a predecessor!');
        const baseURL = nodeData.inputs?.baseURL || options.baseURL;
        const returnValueAs = nodeData.inputs?.returnValueAs;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const chatflowApiKey = (0, utils_1.getCredentialParam)('chatflowApiKey', credentialData, nodeData);
        if (selectedFlowId === options.chatflowid)
            throw new Error('Cannot call the same agentflow!');
        let headers = {};
        if (chatflowApiKey)
            headers = { Authorization: `Bearer ${chatflowApiKey}` };
        const chatflowId = options.chatflowid;
        const sessionId = options.sessionId;
        const chatId = options.chatId;
        const executeFunc = async (state) => {
            const variables = await (0, utils_1.getVars)(appDataSource, databaseEntities, nodeData);
            let flowInput = '';
            if (seqExecuteFlowInput === 'userQuestion') {
                flowInput = input;
            }
            else if (seqExecuteFlowInput && seqExecuteFlowInput.startsWith('{{') && seqExecuteFlowInput.endsWith('}}')) {
                const nodeId = seqExecuteFlowInput.replace('{{', '').replace('}}', '').replace('$', '').trim();
                const messageOutputs = (state.messages ?? []).filter((message) => message.additional_kwargs && message.additional_kwargs?.nodeId === nodeId);
                const messageOutput = messageOutputs[messageOutputs.length - 1];
                if (messageOutput) {
                    flowInput = JSON.stringify(messageOutput.content);
                }
            }
            const flow = {
                chatflowId,
                sessionId,
                chatId,
                input: flowInput,
                state
            };
            const body = {
                question: flowInput,
                chatId: startNewSession ? (0, uuid_1.v4)() : chatId,
                overrideConfig: {
                    sessionId: startNewSession ? (0, uuid_1.v4)() : sessionId,
                    ...(overrideConfig ?? {})
                }
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                body: JSON.stringify(body)
            };
            let sandbox = {
                $input: flowInput,
                $callOptions: options,
                $callBody: body,
                util: undefined,
                Symbol: undefined,
                child_process: undefined,
                fs: undefined,
                process: undefined
            };
            sandbox['$vars'] = (0, utils_1.prepareSandboxVars)(variables);
            sandbox['$flow'] = flow;
            const code = `
    const fetch = require('node-fetch');
    const url = "${baseURL}/api/v1/prediction/${selectedFlowId}";
    
    const body = $callBody;
    
    const options = $callOptions;
    
    try {
        const response = await fetch(url, options);
        const resp = await response.json();
        return resp.text;
    } catch (error) {
        console.error(error);
        return '';
    }
`;
            const builtinDeps = process.env.TOOL_FUNCTION_BUILTIN_DEP
                ? utils_1.defaultAllowBuiltInDep.concat(process.env.TOOL_FUNCTION_BUILTIN_DEP.split(','))
                : utils_1.defaultAllowBuiltInDep;
            const externalDeps = process.env.TOOL_FUNCTION_EXTERNAL_DEP ? process.env.TOOL_FUNCTION_EXTERNAL_DEP.split(',') : [];
            const deps = utils_1.availableDependencies.concat(externalDeps);
            const nodeVMOptions = {
                console: 'inherit',
                sandbox,
                require: {
                    external: { modules: deps },
                    builtin: builtinDeps
                },
                eval: false,
                wasm: false,
                timeout: 10000
            };
            const vm = new nodevm_1.NodeVM(nodeVMOptions);
            try {
                let response = await vm.run(`module.exports = async function() {${code}}()`, __dirname);
                if (typeof response === 'object') {
                    response = JSON.stringify(response);
                }
                if (returnValueAs === 'humanMessage') {
                    return {
                        messages: [
                            new messages_1.HumanMessage({
                                content: response,
                                additional_kwargs: {
                                    nodeId: nodeData.id
                                }
                            })
                        ]
                    };
                }
                return {
                    messages: [
                        new messages_1.AIMessage({
                            content: response,
                            additional_kwargs: {
                                nodeId: nodeData.id
                            }
                        })
                    ]
                };
            }
            catch (e) {
                throw new Error(e);
            }
        };
        const startLLM = sequentialNodes[0].startLLM;
        const returnOutput = {
            id: nodeData.id,
            node: executeFunc,
            name: seqExecuteFlowName,
            label: _seqExecuteFlowName,
            type: 'utilities',
            output: 'ExecuteFlow',
            llm: startLLM,
            startLLM,
            multiModalMessageContent: sequentialNodes[0]?.multiModalMessageContent,
            predecessorAgents: sequentialNodes
        };
        return returnOutput;
    }
}
module.exports = { nodeClass: ExecuteFlow_SeqAgents };
//# sourceMappingURL=ExecuteFlow.js.map