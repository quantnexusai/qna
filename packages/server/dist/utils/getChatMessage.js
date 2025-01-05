"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilGetChatMessage = void 0;
const typeorm_1 = require("typeorm");
const ChatMessage_1 = require("../database/entities/ChatMessage");
const ChatMessageFeedback_1 = require("../database/entities/ChatMessageFeedback");
const getRunningExpressApp_1 = require("../utils/getRunningExpressApp");
const _1 = require(".");
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
const utilGetChatMessage = async (chatflowid, chatType, sortOrder = 'ASC', chatId, memoryType, sessionId, startDate, endDate, messageId, feedback, feedbackTypes) => {
    const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
    let fromDate;
    if (startDate)
        fromDate = (0, _1.setDateToStartOrEndOfDay)(startDate, 'start');
    let toDate;
    if (endDate)
        toDate = (0, _1.setDateToStartOrEndOfDay)(endDate, 'end');
    if (feedback) {
        const query = await appServer.AppDataSource.getRepository(ChatMessage_1.ChatMessage).createQueryBuilder('chat_message');
        // do the join with chat message feedback based on messageId for each chat message in the chatflow
        query
            .leftJoinAndMapOne('chat_message.feedback', ChatMessageFeedback_1.ChatMessageFeedback, 'feedback', 'feedback.messageId = chat_message.id')
            .where('chat_message.chatflowid = :chatflowid', { chatflowid });
        // based on which parameters are available add `andWhere` clauses to the query
        if (chatType) {
            query.andWhere('chat_message.chatType = :chatType', { chatType });
        }
        if (chatId) {
            query.andWhere('chat_message.chatId = :chatId', { chatId });
        }
        if (memoryType) {
            query.andWhere('chat_message.memoryType = :memoryType', { memoryType });
        }
        if (sessionId) {
            query.andWhere('chat_message.sessionId = :sessionId', { sessionId });
        }
        // set date range
        query.andWhere('chat_message.createdDate BETWEEN :fromDate AND :toDate', {
            fromDate: fromDate ?? (0, _1.aMonthAgo)(),
            toDate: toDate ?? new Date()
        });
        // sort
        query.orderBy('chat_message.createdDate', sortOrder === 'DESC' ? 'DESC' : 'ASC');
        const messages = (await query.getMany());
        if (feedbackTypes && feedbackTypes.length > 0) {
            // just applying a filter to the messages array will only return the messages that have feedback,
            // but we also want the message before the feedback message which is the user message.
            const indicesToKeep = new Set();
            messages.forEach((message, index) => {
                if (message.role === 'apiMessage' && message.feedback && feedbackTypes.includes(message.feedback.rating)) {
                    if (index > 0)
                        indicesToKeep.add(index - 1);
                    indicesToKeep.add(index);
                }
            });
            return messages.filter((_, index) => indicesToKeep.has(index));
        }
        return messages;
    }
    return await appServer.AppDataSource.getRepository(ChatMessage_1.ChatMessage).find({
        where: {
            chatflowid,
            chatType,
            chatId,
            memoryType: memoryType ?? undefined,
            sessionId: sessionId ?? undefined,
            ...(fromDate && { createdDate: (0, typeorm_1.MoreThanOrEqual)(fromDate) }),
            ...(toDate && { createdDate: (0, typeorm_1.LessThanOrEqual)(toDate) }),
            id: messageId ?? undefined
        },
        order: {
            createdDate: sortOrder === 'DESC' ? 'DESC' : 'ASC'
        }
    });
};
exports.utilGetChatMessage = utilGetChatMessage;
//# sourceMappingURL=getChatMessage.js.map