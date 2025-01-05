import { ApiKey } from '../../database/entities/ApiKey';
declare const _default: {
    createApiKey: (keyName: string) => Promise<any>;
    deleteApiKey: (id: string) => Promise<any>;
    getAllApiKeys: () => Promise<any>;
    updateApiKey: (id: string, keyName: string) => Promise<any>;
    verifyApiKey: (paramApiKey: string) => Promise<string>;
    getApiKey: (apiKey: string) => Promise<import("flowise-components").ICommonObject | ApiKey | undefined>;
    importKeys: (body: any) => Promise<any>;
};
export default _default;
