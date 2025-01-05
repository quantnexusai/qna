"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const stats_1 = __importDefault(require("../../services/stats"));
const Interface_1 = require("../../Interface");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_1 = require("../../errors/utils");
const getChatflowStats = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: statsController.getChatflowStats - id not provided!`);
        }
        const chatflowid = req.params.id;
        let chatTypeFilter = req.query?.chatType;
        const startDate = req.query?.startDate;
        const endDate = req.query?.endDate;
        let feedbackTypeFilters = req.query?.feedbackType;
        if (chatTypeFilter) {
            try {
                const chatTypeFilterArray = JSON.parse(chatTypeFilter);
                if (chatTypeFilterArray.includes(Interface_1.ChatType.EXTERNAL) && chatTypeFilterArray.includes(Interface_1.ChatType.INTERNAL)) {
                    chatTypeFilter = undefined;
                }
                else if (chatTypeFilterArray.includes(Interface_1.ChatType.EXTERNAL)) {
                    chatTypeFilter = Interface_1.ChatType.EXTERNAL;
                }
                else if (chatTypeFilterArray.includes(Interface_1.ChatType.INTERNAL)) {
                    chatTypeFilter = Interface_1.ChatType.INTERNAL;
                }
            }
            catch (e) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: statsController.getChatflowStats - ${(0, utils_1.getErrorMessage)(e)}`);
            }
        }
        if (feedbackTypeFilters) {
            try {
                const feedbackTypeFilterArray = JSON.parse(JSON.stringify(feedbackTypeFilters));
                if (feedbackTypeFilterArray.includes(Interface_1.ChatMessageRatingType.THUMBS_UP) &&
                    feedbackTypeFilterArray.includes(Interface_1.ChatMessageRatingType.THUMBS_DOWN)) {
                    feedbackTypeFilters = [Interface_1.ChatMessageRatingType.THUMBS_UP, Interface_1.ChatMessageRatingType.THUMBS_DOWN];
                }
                else if (feedbackTypeFilterArray.includes(Interface_1.ChatMessageRatingType.THUMBS_UP)) {
                    feedbackTypeFilters = [Interface_1.ChatMessageRatingType.THUMBS_UP];
                }
                else if (feedbackTypeFilterArray.includes(Interface_1.ChatMessageRatingType.THUMBS_DOWN)) {
                    feedbackTypeFilters = [Interface_1.ChatMessageRatingType.THUMBS_DOWN];
                }
                else {
                    feedbackTypeFilters = undefined;
                }
            }
            catch (e) {
                return res.status(500).send(e);
            }
        }
        const apiResponse = await stats_1.default.getChatflowStats(chatflowid, chatTypeFilter, startDate, endDate, '', true, feedbackTypeFilters);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getChatflowStats
};
//# sourceMappingURL=index.js.map