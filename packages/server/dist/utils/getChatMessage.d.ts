import { ChatMessageRatingType, ChatType } from '../Interface';
import { ChatMessage } from '../database/entities/ChatMessage';
/**
 * Method that get chat messages.
 * @param {string} chatflowid
 * @param {ChatType} chatType
 * @param {string} sortOrder
 * @param {string} chatId
 * @param {string} memoryType
 * @param {string} sessionId
 * @param {string} startDate
 * @param {string} endDate
 * @param {boolean} feedback
 * @param {ChatMessageRatingType[]} feedbackTypes
 */
export declare const utilGetChatMessage: (chatflowid: string, chatType: ChatType | undefined, sortOrder?: string, chatId?: string, memoryType?: string, sessionId?: string, startDate?: string, endDate?: string, messageId?: string, feedback?: boolean, feedbackTypes?: ChatMessageRatingType[]) => Promise<ChatMessage[]>;
