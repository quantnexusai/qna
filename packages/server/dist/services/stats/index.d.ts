import { ChatMessageRatingType, ChatType } from '../../Interface';
declare const _default: {
    getChatflowStats: (chatflowid: string, chatTypeFilter: ChatType | undefined, startDate?: string, endDate?: string, messageId?: string, feedback?: boolean, feedbackTypes?: ChatMessageRatingType[]) => Promise<any>;
};
export default _default;