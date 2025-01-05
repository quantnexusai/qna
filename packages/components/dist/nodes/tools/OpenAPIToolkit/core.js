"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicStructuredTool = exports.howToUseCode = exports.defaultCode = void 0;
const nodevm_1 = require("@flowiseai/nodevm");
const tools_1 = require("@langchain/core/tools");
const manager_1 = require("@langchain/core/callbacks/manager");
const utils_1 = require("../../../src/utils");
exports.defaultCode = `const fetch = require('node-fetch');
const url = $url;
const options = $options;

try {
	const response = await fetch(url, options);
	const resp = await response.json();
	return JSON.stringify(resp);
} catch (error) {
	console.error(error);
	return '';
}
`;
exports.howToUseCode = `- **Libraries:**  
  You can use any libraries imported in Flowise.

- **Tool Input Arguments:**  
  Tool input arguments are available as the following variables:
  - \`$PathParameters\`
  - \`$QueryParameters\`
  - \`$RequestBody\`

- **HTTP Requests:**  
  By default, you can get the following values for making HTTP requests:
  - \`$url\`
  - \`$options\`

- **Default Flow Config:**  
  You can access the default flow configuration using these variables:
  - \`$flow.sessionId\`
  - \`$flow.chatId\`
  - \`$flow.chatflowId\`
  - \`$flow.input\`
  - \`$flow.state\`

- **Custom Variables:**  
  You can get custom variables using the syntax:
  - \`$vars.<variable-name>\`

- **Return Value:**  
  The function must return a **string** value at the end.

\`\`\`js
${exports.defaultCode}
\`\`\`
`;
const getUrl = (baseUrl, requestObject) => {
    let url = baseUrl;
    // Add PathParameters to URL if present
    if (requestObject.PathParameters) {
        for (const [key, value] of Object.entries(requestObject.PathParameters)) {
            url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
        }
    }
    // Add QueryParameters to URL if present
    if (requestObject.QueryParameters) {
        const queryParams = new URLSearchParams(requestObject.QueryParameters);
        url += `?${queryParams.toString()}`;
    }
    return url;
};
class ToolInputParsingException extends Error {
    constructor(message, output) {
        super(message);
        this.output = output;
    }
}
class DynamicStructuredTool extends tools_1.StructuredTool {
    constructor(fields) {
        super(fields);
        this.name = fields.name;
        this.description = fields.description;
        this.func = fields.func;
        this.returnDirect = fields.returnDirect ?? this.returnDirect;
        this.schema = fields.schema;
        this.baseUrl = fields.baseUrl;
        this.method = fields.method;
        this.headers = fields.headers;
        this.customCode = fields.customCode;
    }
    async call(arg, configArg, tags, flowConfig) {
        const config = (0, manager_1.parseCallbackConfigArg)(configArg);
        if (config.runName === undefined) {
            config.runName = this.name;
        }
        let parsed;
        try {
            parsed = await this.schema.parseAsync(arg);
        }
        catch (e) {
            throw new ToolInputParsingException(`Received tool input did not match expected schema`, JSON.stringify(arg));
        }
        const callbackManager_ = await manager_1.CallbackManager.configure(config.callbacks, this.callbacks, config.tags || tags, this.tags, config.metadata, this.metadata, { verbose: this.verbose });
        const runManager = await callbackManager_?.handleToolStart(this.toJSON(), typeof parsed === 'string' ? parsed : JSON.stringify(parsed), undefined, undefined, undefined, undefined, config.runName);
        let result;
        try {
            result = await this._call(parsed, runManager, flowConfig);
        }
        catch (e) {
            await runManager?.handleToolError(e);
            throw e;
        }
        if (result && typeof result !== 'string') {
            result = JSON.stringify(result);
        }
        await runManager?.handleToolEnd(result);
        return result;
    }
    // @ts-ignore
    async _call(arg, _, flowConfig) {
        let sandbox = {};
        if (typeof arg === 'object' && Object.keys(arg).length) {
            for (const item in arg) {
                sandbox[`$${item}`] = arg[item];
            }
        }
        sandbox['$vars'] = (0, utils_1.prepareSandboxVars)(this.variables);
        // inject flow properties
        if (this.flowObj) {
            sandbox['$flow'] = { ...this.flowObj, ...flowConfig };
        }
        const callOptions = {
            method: this.method,
            headers: {
                'Content-Type': 'application/json',
                ...this.headers
            }
        };
        if (arg.RequestBody && this.method.toUpperCase() !== 'GET') {
            callOptions.body = JSON.stringify(arg.RequestBody);
        }
        sandbox['$options'] = callOptions;
        const completeUrl = getUrl(this.baseUrl, arg);
        sandbox['$url'] = completeUrl;
        const builtinDeps = process.env.TOOL_FUNCTION_BUILTIN_DEP
            ? utils_1.defaultAllowBuiltInDep.concat(process.env.TOOL_FUNCTION_BUILTIN_DEP.split(','))
            : utils_1.defaultAllowBuiltInDep;
        const externalDeps = process.env.TOOL_FUNCTION_EXTERNAL_DEP ? process.env.TOOL_FUNCTION_EXTERNAL_DEP.split(',') : [];
        const deps = utils_1.availableDependencies.concat(externalDeps);
        const options = {
            console: 'inherit',
            sandbox,
            require: {
                external: { modules: deps },
                builtin: builtinDeps
            }
        };
        const vm = new nodevm_1.NodeVM(options);
        const response = await vm.run(`module.exports = async function() {${this.customCode || exports.defaultCode}}()`, __dirname);
        return response;
    }
    setVariables(variables) {
        this.variables = variables;
    }
    setFlowObject(flow) {
        this.flowObj = flow;
    }
}
exports.DynamicStructuredTool = DynamicStructuredTool;
//# sourceMappingURL=core.js.map