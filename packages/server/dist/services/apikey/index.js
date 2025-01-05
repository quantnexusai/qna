"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const apiKey_1 = require("../../utils/apiKey");
const addChatflowsCount_1 = require("../../utils/addChatflowsCount");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_1 = require("../../errors/utils");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const ApiKey_1 = require("../../database/entities/ApiKey");
const AppConfig_1 = require("../../AppConfig");
const crypto_1 = require("crypto");
const typeorm_1 = require("typeorm");
const _apikeysStoredInJson = () => {
    return AppConfig_1.appConfig.apiKeys.storageType === 'json';
};
const _apikeysStoredInDb = () => {
    return AppConfig_1.appConfig.apiKeys.storageType === 'db';
};
const getAllApiKeys = async () => {
    try {
        if (_apikeysStoredInJson()) {
            const keys = await (0, apiKey_1.getAPIKeys)();
            return await (0, addChatflowsCount_1.addChatflowsCount)(keys);
        }
        else if (_apikeysStoredInDb()) {
            const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
            let keys = await appServer.AppDataSource.getRepository(ApiKey_1.ApiKey).find();
            if (keys.length === 0) {
                await createApiKey('DefaultKey');
                keys = await appServer.AppDataSource.getRepository(ApiKey_1.ApiKey).find();
            }
            return await (0, addChatflowsCount_1.addChatflowsCount)(keys);
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `UNKNOWN APIKEY_STORAGE_TYPE`);
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: apikeyService.getAllApiKeys - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
const getApiKey = async (apiKey) => {
    try {
        if (_apikeysStoredInJson()) {
            return (0, apiKey_1.getApiKey)(apiKey);
        }
        else if (_apikeysStoredInDb()) {
            const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
            const currentKey = await appServer.AppDataSource.getRepository(ApiKey_1.ApiKey).findOneBy({
                apiKey: apiKey
            });
            if (!currentKey) {
                return undefined;
            }
            return currentKey;
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `UNKNOWN APIKEY_STORAGE_TYPE`);
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: apikeyService.createApiKey - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
const createApiKey = async (keyName) => {
    try {
        if (_apikeysStoredInJson()) {
            const keys = await (0, apiKey_1.addAPIKey)(keyName);
            return await (0, addChatflowsCount_1.addChatflowsCount)(keys);
        }
        else if (_apikeysStoredInDb()) {
            const apiKey = (0, apiKey_1.generateAPIKey)();
            const apiSecret = (0, apiKey_1.generateSecretHash)(apiKey);
            const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
            const newKey = new ApiKey_1.ApiKey();
            newKey.id = (0, crypto_1.randomBytes)(16).toString('hex');
            newKey.apiKey = apiKey;
            newKey.apiSecret = apiSecret;
            newKey.keyName = keyName;
            const key = appServer.AppDataSource.getRepository(ApiKey_1.ApiKey).create(newKey);
            await appServer.AppDataSource.getRepository(ApiKey_1.ApiKey).save(key);
            return getAllApiKeys();
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `UNKNOWN APIKEY_STORAGE_TYPE`);
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: apikeyService.createApiKey - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
// Update api key
const updateApiKey = async (id, keyName) => {
    try {
        if (_apikeysStoredInJson()) {
            const keys = await (0, apiKey_1.updateAPIKey)(id, keyName);
            return await (0, addChatflowsCount_1.addChatflowsCount)(keys);
        }
        else if (_apikeysStoredInDb()) {
            const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
            const currentKey = await appServer.AppDataSource.getRepository(ApiKey_1.ApiKey).findOneBy({
                id: id
            });
            if (!currentKey) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `ApiKey ${currentKey} not found`);
            }
            currentKey.keyName = keyName;
            await appServer.AppDataSource.getRepository(ApiKey_1.ApiKey).save(currentKey);
            return getAllApiKeys();
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `UNKNOWN APIKEY_STORAGE_TYPE`);
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: apikeyService.updateApiKey - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
const deleteApiKey = async (id) => {
    try {
        if (_apikeysStoredInJson()) {
            const keys = await (0, apiKey_1.deleteAPIKey)(id);
            return await (0, addChatflowsCount_1.addChatflowsCount)(keys);
        }
        else if (_apikeysStoredInDb()) {
            const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
            const dbResponse = await appServer.AppDataSource.getRepository(ApiKey_1.ApiKey).delete({ id: id });
            if (!dbResponse) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `ApiKey ${id} not found`);
            }
            return getAllApiKeys();
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `UNKNOWN APIKEY_STORAGE_TYPE`);
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: apikeyService.deleteApiKey - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
const importKeys = async (body) => {
    try {
        const jsonFile = body.jsonFile;
        const splitDataURI = jsonFile.split(',');
        if (splitDataURI[0] !== 'data:application/json;base64') {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Invalid dataURI`);
        }
        const bf = Buffer.from(splitDataURI[1] || '', 'base64');
        const plain = bf.toString('utf8');
        const keys = JSON.parse(plain);
        if (_apikeysStoredInJson()) {
            if (body.importMode === 'replaceAll') {
                await (0, apiKey_1.replaceAllAPIKeys)(keys);
            }
            else {
                await (0, apiKey_1.importKeys)(keys, body.importMode);
            }
            return await (0, addChatflowsCount_1.addChatflowsCount)(keys);
        }
        else if (_apikeysStoredInDb()) {
            const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
            const allApiKeys = await appServer.AppDataSource.getRepository(ApiKey_1.ApiKey).find();
            if (body.importMode === 'replaceAll') {
                await appServer.AppDataSource.getRepository(ApiKey_1.ApiKey).delete({
                    id: (0, typeorm_1.Not)((0, typeorm_1.IsNull)())
                });
            }
            if (body.importMode === 'errorIfExist') {
                // if importMode is errorIfExist, check for existing keys and raise error before any modification to the DB
                for (const key of keys) {
                    const keyNameExists = allApiKeys.find((k) => k.keyName === key.keyName);
                    if (keyNameExists) {
                        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Key with name ${key.keyName} already exists`);
                    }
                }
            }
            // iterate through the keys and add them to the database
            for (const key of keys) {
                const keyNameExists = allApiKeys.find((k) => k.keyName === key.keyName);
                if (keyNameExists) {
                    const keyIndex = allApiKeys.findIndex((k) => k.keyName === key.keyName);
                    switch (body.importMode) {
                        case 'overwriteIfExist': {
                            const currentKey = allApiKeys[keyIndex];
                            currentKey.id = key.id;
                            currentKey.apiKey = key.apiKey;
                            currentKey.apiSecret = key.apiSecret;
                            await appServer.AppDataSource.getRepository(ApiKey_1.ApiKey).save(currentKey);
                            break;
                        }
                        case 'ignoreIfExist': {
                            // ignore this key and continue
                            continue;
                        }
                        case 'errorIfExist': {
                            // should not reach here as we have already checked for existing keys
                            throw new Error(`Key with name ${key.keyName} already exists`);
                        }
                        default: {
                            throw new Error(`Unknown overwrite option ${body.importMode}`);
                        }
                    }
                }
                else {
                    const newKey = new ApiKey_1.ApiKey();
                    newKey.id = key.id;
                    newKey.apiKey = key.apiKey;
                    newKey.apiSecret = key.apiSecret;
                    newKey.keyName = key.keyName;
                    const newKeyEntity = appServer.AppDataSource.getRepository(ApiKey_1.ApiKey).create(newKey);
                    await appServer.AppDataSource.getRepository(ApiKey_1.ApiKey).save(newKeyEntity);
                }
            }
            return getAllApiKeys();
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `UNKNOWN APIKEY_STORAGE_TYPE`);
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: apikeyService.importKeys - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
const verifyApiKey = async (paramApiKey) => {
    try {
        if (_apikeysStoredInJson()) {
            const apiKey = await (0, apiKey_1.getApiKey)(paramApiKey);
            if (!apiKey) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.UNAUTHORIZED, `Unauthorized`);
            }
            return 'OK';
        }
        else if (_apikeysStoredInDb()) {
            const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
            const apiKey = await appServer.AppDataSource.getRepository(ApiKey_1.ApiKey).findOneBy({
                apiKey: paramApiKey
            });
            if (!apiKey) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.UNAUTHORIZED, `Unauthorized`);
            }
            return 'OK';
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `UNKNOWN APIKEY_STORAGE_TYPE`);
        }
    }
    catch (error) {
        if (error instanceof internalFlowiseError_1.InternalFlowiseError && error.statusCode === http_status_codes_1.StatusCodes.UNAUTHORIZED) {
            throw error;
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: apikeyService.verifyApiKey - ${(0, utils_1.getErrorMessage)(error)}`);
        }
    }
};
exports.default = {
    createApiKey,
    deleteApiKey,
    getAllApiKeys,
    updateApiKey,
    verifyApiKey,
    getApiKey,
    importKeys
};
//# sourceMappingURL=index.js.map