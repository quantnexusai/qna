import { IServerSideEventStreamer } from 'flowise-components';
import { IChatFlow, IncomingInput } from '../Interface';
/**
 * Build Agent Graph
 * @param {IChatFlow} chatflow
 * @param {string} chatId
 * @param {string} sessionId
 * @param {ICommonObject} incomingInput
 * @param {boolean} isInternal
 * @param {string} baseURL
 */
export declare const buildAgentGraph: (chatflow: IChatFlow, chatId: string, apiMessageId: string, sessionId: string, incomingInput: IncomingInput, isInternal: boolean, baseURL?: string, sseStreamer?: IServerSideEventStreamer, shouldStreamResponse?: boolean, uploadedFilesContent?: string) => Promise<any>;
