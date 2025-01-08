"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const nodevm_1 = require("@flowiseai/nodevm");
const utils_1 = require("../../../src/utils");
class CustomFunction_Utilities {
    constructor() {
        this.label = 'Custom JS Function';
        this.name = 'customFunction';
        this.version = 3.0;
        this.type = 'CustomFunction';
        this.icon = 'customfunction.svg';
        this.category = 'Utilities';
        this.description = `Execute custom javascript function`;
        this.baseClasses = [this.type, 'Utilities'];
        this.tags = ['Utilities'];
        this.inputs = [
            {
                label: 'Input Variables',
                name: 'functionInputVariables',
                description: 'Input variables can be used in the function with prefix $. For example: $var',
                type: 'json',
                optional: true,
                acceptVariable: true,
                list: true
            },
            {
                label: 'Function Name',
                name: 'functionName',
                type: 'string',
                optional: true,
                placeholder: 'My Function'
            },
            {
                label: 'Additional Tools',
                description: 'Tools can be used in the function with $tools.{tool_name}.invoke(args)',
                name: 'tools',
                type: 'Tool',
                list: true,
                optional: true
            },
            {
                label: 'Javascript Function',
                name: 'javascriptFunction',
                type: 'code'
            }
        ];
        this.outputs = [
            {
                label: 'Output',
                name: 'output',
                baseClasses: ['string', 'number', 'boolean', 'json', 'array']
            },
            {
                label: 'Ending Node',
                name: 'EndingNode',
                baseClasses: [this.type]
            }
        ];
    }
    async init(nodeData, input, options) {
        const isEndingNode = nodeData?.outputs?.output === 'EndingNode';
        if (isEndingNode && !options.isRun)
            return; // prevent running both init and run twice
        const javascriptFunction = nodeData.inputs?.javascriptFunction;
        const functionInputVariablesRaw = nodeData.inputs?.functionInputVariables;
        const appDataSource = options.appDataSource;
        const databaseEntities = options.databaseEntities;
        const tools = Object.fromEntries((0, lodash_1.flatten)(nodeData.inputs?.tools)?.map((tool) => [tool.name, tool]) ?? []);
        const variables = await (0, utils_1.getVars)(appDataSource, databaseEntities, nodeData);
        const flow = {
            chatflowId: options.chatflowid,
            sessionId: options.sessionId,
            chatId: options.chatId,
            input
        };
        let inputVars = {};
        if (functionInputVariablesRaw) {
            try {
                inputVars =
                    typeof functionInputVariablesRaw === 'object' ? functionInputVariablesRaw : JSON.parse(functionInputVariablesRaw);
            }
            catch (exception) {
                throw new Error('Invalid JSON in the Custom Function Input Variables: ' + exception);
            }
        }
        // Some values might be a stringified JSON, parse it
        for (const key in inputVars) {
            let value = inputVars[key];
            if (typeof value === 'string') {
                value = (0, utils_1.handleEscapeCharacters)(value, true);
                if (value.startsWith('{') && value.endsWith('}')) {
                    try {
                        value = JSON.parse(value);
                    }
                    catch (e) {
                        // ignore
                    }
                }
                inputVars[key] = value;
            }
        }
        let sandbox = {
            $input: input,
            util: undefined,
            Symbol: undefined,
            child_process: undefined,
            fs: undefined,
            process: undefined
        };
        sandbox['$vars'] = (0, utils_1.prepareSandboxVars)(variables);
        sandbox['$flow'] = flow;
        sandbox['$tools'] = tools;
        if (Object.keys(inputVars).length) {
            for (const item in inputVars) {
                sandbox[`$${item}`] = inputVars[item];
            }
        }
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
            const response = await vm.run(`module.exports = async function() {${javascriptFunction}}()`, __dirname);
            if (typeof response === 'string' && !isEndingNode) {
                return (0, utils_1.handleEscapeCharacters)(response, false);
            }
            return response;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async run(nodeData, input, options) {
        return await this.init(nodeData, input, { ...options, isRun: true });
    }
}
module.exports = { nodeClass: CustomFunction_Utilities };
//# sourceMappingURL=CustomFunction.js.map