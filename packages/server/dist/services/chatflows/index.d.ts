import { ChatflowType } from '../../Interface';
import { ChatFlow } from '../../database/entities/ChatFlow';
import { QueryRunner } from 'typeorm';
declare const _default: {
    checkIfChatflowIsValidForStreaming: (chatflowId: string) => Promise<any>;
    checkIfChatflowIsValidForUploads: (chatflowId: string) => Promise<any>;
    deleteChatflow: (chatflowId: string) => Promise<any>;
    getAllChatflows: (type?: ChatflowType) => Promise<ChatFlow[]>;
    getChatflowByApiKey: (apiKeyId: string, keyonly?: unknown) => Promise<any>;
    getChatflowById: (chatflowId: string) => Promise<any>;
    saveChatflow: (newChatFlow: ChatFlow) => Promise<any>;
    importChatflows: (newChatflows: Partial<ChatFlow>[], queryRunner?: QueryRunner) => Promise<any>;
    updateChatflow: (chatflow: ChatFlow, updateChatFlow: ChatFlow) => Promise<any>;
    getSinglePublicChatflow: (chatflowId: string) => Promise<any>;
    getSinglePublicChatbotConfig: (chatflowId: string) => Promise<any>;
};
export default _default;
