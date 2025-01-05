"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegions = exports.getModels = exports.MODEL_TYPE = void 0;
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const MASTER_MODEL_LIST = 'https://raw.githubusercontent.com/FlowiseAI/Flowise/main/packages/components/models.json';
var MODEL_TYPE;
(function (MODEL_TYPE) {
    MODEL_TYPE["CHAT"] = "chat";
    MODEL_TYPE["LLM"] = "llm";
    MODEL_TYPE["EMBEDDING"] = "embedding";
})(MODEL_TYPE || (exports.MODEL_TYPE = MODEL_TYPE = {}));
const getModelsJSONPath = () => {
    const checkModelsPaths = [path.join(__dirname, '..', 'models.json'), path.join(__dirname, '..', '..', 'models.json')];
    for (const checkPath of checkModelsPaths) {
        if (fs.existsSync(checkPath)) {
            return checkPath;
        }
    }
    return '';
};
const isValidUrl = (urlString) => {
    let url;
    try {
        url = new URL(urlString);
    }
    catch (e) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
};
const getModelConfig = async (category, name) => {
    const modelFile = process.env.MODEL_LIST_CONFIG_JSON || MASTER_MODEL_LIST;
    if (!modelFile) {
        throw new Error('MODEL_LIST_CONFIG_JSON not set');
    }
    if (isValidUrl(modelFile)) {
        try {
            const resp = await axios_1.default.get(modelFile);
            if (resp.status === 200 && resp.data) {
                const models = resp.data;
                const categoryModels = models[category];
                return categoryModels.find((model) => model.name === name);
            }
            else {
                throw new Error('Error fetching model list');
            }
        }
        catch (e) {
            const models = await fs.promises.readFile(getModelsJSONPath(), 'utf8');
            if (models) {
                const categoryModels = JSON.parse(models)[category];
                return categoryModels.find((model) => model.name === name);
            }
            return {};
        }
    }
    else {
        try {
            if (fs.existsSync(modelFile)) {
                const models = await fs.promises.readFile(modelFile, 'utf8');
                if (models) {
                    const categoryModels = JSON.parse(models)[category];
                    return categoryModels.find((model) => model.name === name);
                }
            }
            return {};
        }
        catch (e) {
            const models = await fs.promises.readFile(getModelsJSONPath(), 'utf8');
            if (models) {
                const categoryModels = JSON.parse(models)[category];
                return categoryModels.find((model) => model.name === name);
            }
            return {};
        }
    }
};
const getModels = async (category, name) => {
    const returnData = [];
    try {
        const modelConfig = await getModelConfig(category, name);
        returnData.push(...modelConfig.models);
        return returnData;
    }
    catch (e) {
        throw new Error(`Error: getModels - ${e}`);
    }
};
exports.getModels = getModels;
const getRegions = async (category, name) => {
    const returnData = [];
    try {
        const modelConfig = await getModelConfig(category, name);
        returnData.push(...modelConfig.regions);
        return returnData;
    }
    catch (e) {
        throw new Error(`Error: getRegions - ${e}`);
    }
};
exports.getRegions = getRegions;
//# sourceMappingURL=modelLoader.js.map