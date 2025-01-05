"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_yaml_1 = require("js-yaml");
const src_1 = require("../../../src");
const json_schema_ref_parser_1 = __importDefault(require("@apidevtools/json-schema-ref-parser"));
const zod_1 = require("zod");
const core_1 = require("./core");
class OpenAPIToolkit_Tools {
    constructor() {
        this.label = 'OpenAPI Toolkit';
        this.name = 'openAPIToolkit';
        this.version = 2.0;
        this.type = 'OpenAPIToolkit';
        this.icon = 'openapi.svg';
        this.category = 'Tools';
        this.description = 'Load OpenAPI specification, and converts each API endpoint to a tool';
        this.inputs = [
            {
                label: 'YAML File',
                name: 'yamlFile',
                type: 'file',
                fileType: '.yaml'
            },
            {
                label: 'Return Direct',
                name: 'returnDirect',
                description: 'Return the output of the tool directly to the user',
                type: 'boolean',
                optional: true
            },
            {
                label: 'Headers',
                name: 'headers',
                type: 'json',
                description: 'Request headers to be sent with the API request. For example, {"Authorization": "Bearer token"}',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Custom Code',
                name: 'customCode',
                type: 'code',
                hint: {
                    label: 'How to use',
                    value: core_1.howToUseCode
                },
                codeExample: core_1.defaultCode,
                description: `Custom code to return the output of the tool. The code should be a function that takes in the input and returns a string`,
                hideCodeExecute: true,
                default: core_1.defaultCode,
                additionalParams: true
            }
        ];
        this.baseClasses = [this.type, 'Tool'];
    }
    async init(nodeData, _, options) {
        const toolReturnDirect = nodeData.inputs?.returnDirect;
        const yamlFileBase64 = nodeData.inputs?.yamlFile;
        const customCode = nodeData.inputs?.customCode;
        const _headers = nodeData.inputs?.headers;
        const headers = typeof _headers === 'object' ? _headers : _headers ? JSON.parse(_headers) : {};
        let data;
        if (yamlFileBase64.startsWith('FILE-STORAGE::')) {
            const file = yamlFileBase64.replace('FILE-STORAGE::', '');
            const chatflowid = options.chatflowid;
            const fileData = await (0, src_1.getFileFromStorage)(file, chatflowid);
            const utf8String = fileData.toString('utf-8');
            data = (0, js_yaml_1.load)(utf8String);
        }
        else {
            const splitDataURI = yamlFileBase64.split(',');
            splitDataURI.pop();
            const bf = Buffer.from(splitDataURI.pop() || '', 'base64');
            const utf8String = bf.toString('utf-8');
            data = (0, js_yaml_1.load)(utf8String);
        }
        if (!data) {
            throw new Error('Failed to load OpenAPI spec');
        }
        const _data = await json_schema_ref_parser_1.default.dereference(data);
        const baseUrl = _data.servers[0]?.url;
        if (!baseUrl) {
            throw new Error('OpenAPI spec does not contain a server URL');
        }
        const appDataSource = options.appDataSource;
        const databaseEntities = options.databaseEntities;
        const variables = await (0, src_1.getVars)(appDataSource, databaseEntities, nodeData);
        const flow = { chatflowId: options.chatflowid };
        const tools = getTools(_data.paths, baseUrl, headers, variables, flow, toolReturnDirect, customCode);
        return tools;
    }
}
const jsonSchemaToZodSchema = (schema, requiredList, keyName) => {
    if (schema.properties) {
        // Handle object types by recursively processing properties
        const zodShape = {};
        for (const key in schema.properties) {
            zodShape[key] = jsonSchemaToZodSchema(schema.properties[key], requiredList, key);
        }
        return zod_1.z.object(zodShape);
    }
    else if (schema.oneOf) {
        // Handle oneOf by mapping each option to a Zod schema
        const zodSchemas = schema.oneOf.map((subSchema) => jsonSchemaToZodSchema(subSchema, requiredList, keyName));
        return zod_1.z.union(zodSchemas);
    }
    else if (schema.enum) {
        // Handle enum types
        return requiredList.includes(keyName)
            ? zod_1.z.enum(schema.enum).describe(schema?.description ?? keyName)
            : zod_1.z
                .enum(schema.enum)
                .describe(schema?.description ?? keyName)
                .optional();
    }
    else if (schema.type === 'string') {
        return requiredList.includes(keyName)
            ? zod_1.z.string({ required_error: `${keyName} required` }).describe(schema?.description ?? keyName)
            : zod_1.z
                .string()
                .describe(schema?.description ?? keyName)
                .optional();
    }
    else if (schema.type === 'array') {
        return zod_1.z.array(jsonSchemaToZodSchema(schema.items, requiredList, keyName));
    }
    else if (schema.type === 'boolean') {
        return requiredList.includes(keyName)
            ? zod_1.z.number({ required_error: `${keyName} required` }).describe(schema?.description ?? keyName)
            : zod_1.z
                .number()
                .describe(schema?.description ?? keyName)
                .optional();
    }
    else if (schema.type === 'number') {
        return requiredList.includes(keyName)
            ? zod_1.z.boolean({ required_error: `${keyName} required` }).describe(schema?.description ?? keyName)
            : zod_1.z
                .boolean()
                .describe(schema?.description ?? keyName)
                .optional();
    }
    // Fallback to unknown type if unrecognized
    return zod_1.z.unknown();
};
const extractParameters = (param, paramZodObj) => {
    const paramSchema = param.schema;
    const paramName = param.name;
    const paramDesc = param.description || param.name;
    if (paramSchema.type === 'string') {
        if (param.required) {
            paramZodObj[paramName] = zod_1.z.string({ required_error: `${paramName} required` }).describe(paramDesc);
        }
        else {
            paramZodObj[paramName] = zod_1.z.string().describe(paramDesc).optional();
        }
    }
    else if (paramSchema.type === 'number') {
        if (param.required) {
            paramZodObj[paramName] = zod_1.z.number({ required_error: `${paramName} required` }).describe(paramDesc);
        }
        else {
            paramZodObj[paramName] = zod_1.z.number().describe(paramDesc).optional();
        }
    }
    else if (paramSchema.type === 'boolean') {
        if (param.required) {
            paramZodObj[paramName] = zod_1.z.boolean({ required_error: `${paramName} required` }).describe(paramDesc);
        }
        else {
            paramZodObj[paramName] = zod_1.z.boolean().describe(paramDesc).optional();
        }
    }
    return paramZodObj;
};
const getTools = (paths, baseUrl, headers, variables, flow, returnDirect, customCode) => {
    const tools = [];
    for (const path in paths) {
        // example of path: "/engines"
        const methods = paths[path];
        for (const method in methods) {
            // example of method: "get"
            const spec = methods[method];
            const toolName = spec.operationId;
            const toolDesc = spec.description || spec.summary || toolName;
            let zodObj = {};
            if (spec.parameters) {
                // Get parameters with in = path
                let paramZodObjPath = {};
                for (const param of spec.parameters.filter((param) => param.in === 'path')) {
                    paramZodObjPath = extractParameters(param, paramZodObjPath);
                }
                // Get parameters with in = query
                let paramZodObjQuery = {};
                for (const param of spec.parameters.filter((param) => param.in === 'query')) {
                    paramZodObjQuery = extractParameters(param, paramZodObjQuery);
                }
                // Combine path and query parameters
                zodObj = {
                    ...zodObj,
                    PathParameters: zod_1.z.object(paramZodObjPath),
                    QueryParameters: zod_1.z.object(paramZodObjQuery)
                };
            }
            if (spec.requestBody) {
                let content = {};
                if (spec.requestBody.content['application/json']) {
                    content = spec.requestBody.content['application/json'];
                }
                else if (spec.requestBody.content['application/x-www-form-urlencoded']) {
                    content = spec.requestBody.content['application/x-www-form-urlencoded'];
                }
                else if (spec.requestBody.content['multipart/form-data']) {
                    content = spec.requestBody.content['multipart/form-data'];
                }
                else if (spec.requestBody.content['text/plain']) {
                    content = spec.requestBody.content['text/plain'];
                }
                const requestBodySchema = content.schema;
                if (requestBodySchema) {
                    const requiredList = requestBodySchema.required || [];
                    const requestBodyZodObj = jsonSchemaToZodSchema(requestBodySchema, requiredList, 'properties');
                    zodObj = {
                        ...zodObj,
                        RequestBody: requestBodyZodObj
                    };
                }
                else {
                    zodObj = {
                        ...zodObj,
                        input: zod_1.z.string().describe('Query input').optional()
                    };
                }
            }
            if (!spec.parameters && !spec.requestBody) {
                zodObj = {
                    input: zod_1.z.string().describe('Query input').optional()
                };
            }
            const toolObj = {
                name: toolName,
                description: toolDesc,
                schema: zod_1.z.object(zodObj),
                baseUrl: `${baseUrl}${path}`,
                method: method,
                headers,
                customCode
            };
            const dynamicStructuredTool = new core_1.DynamicStructuredTool(toolObj);
            dynamicStructuredTool.setVariables(variables);
            dynamicStructuredTool.setFlowObject(flow);
            dynamicStructuredTool.returnDirect = returnDirect;
            tools.push(dynamicStructuredTool);
        }
    }
    return tools;
};
module.exports = { nodeClass: OpenAPIToolkit_Tools };
//# sourceMappingURL=OpenAPIToolkit.js.map