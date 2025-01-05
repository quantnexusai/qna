"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodevm_1 = require("@flowiseai/nodevm");
const utils_1 = require("../../../src/utils");
class CustomDocumentLoader_DocumentLoaders {
    constructor() {
        this.label = 'Custom Document Loader';
        this.name = 'customDocumentLoader';
        this.version = 1.0;
        this.type = 'Document';
        this.icon = 'customDocLoader.svg';
        this.category = 'Document Loaders';
        this.description = `Custom function for loading documents`;
        this.baseClasses = [this.type];
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
                label: 'Javascript Function',
                name: 'javascriptFunction',
                type: 'code',
                description: `Must return an array of document objects containing metadata and pageContent if "Document" is selected in the output. If "Text" is selected in the output, it must return a string.`,
                placeholder: `return [
  {
    pageContent: 'Document Content',
    metadata: {
      title: 'Document Title',
    }
  }
]`
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
    async init(nodeData, input, options) {
        const output = nodeData.outputs?.output;
        const javascriptFunction = nodeData.inputs?.javascriptFunction;
        const functionInputVariablesRaw = nodeData.inputs?.functionInputVariables;
        const appDataSource = options.appDataSource;
        const databaseEntities = options.databaseEntities;
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
                throw new Error('Invalid JSON in the Custom Document Loader Input Variables: ' + exception);
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
        let sandbox = { $input: input };
        sandbox['$vars'] = (0, utils_1.prepareSandboxVars)(variables);
        sandbox['$flow'] = flow;
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
            }
        };
        const vm = new nodevm_1.NodeVM(nodeVMOptions);
        try {
            const response = await vm.run(`module.exports = async function() {${javascriptFunction}}()`, __dirname);
            if (output === 'document' && Array.isArray(response)) {
                if (response.length === 0)
                    return response;
                if (response[0].pageContent &&
                    typeof response[0].pageContent === 'string' &&
                    response[0].metadata &&
                    typeof response[0].metadata === 'object')
                    return response;
                throw new Error('Document object must contain pageContent and metadata');
            }
            if (output === 'text' && typeof response === 'string') {
                return (0, utils_1.handleEscapeCharacters)(response, false);
            }
            return response;
        }
        catch (e) {
            throw new Error(e);
        }
    }
}
module.exports = { nodeClass: CustomDocumentLoader_DocumentLoaders };
//# sourceMappingURL=CustomDocumentLoader.js.map