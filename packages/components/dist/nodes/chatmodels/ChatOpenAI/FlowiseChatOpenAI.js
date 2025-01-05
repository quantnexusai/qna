"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatOpenAI = void 0;
const openai_1 = require("@langchain/openai");
class ChatOpenAI extends openai_1.ChatOpenAI {
    constructor(id, fields, 
    /** @deprecated */
    configuration) {
        super(fields, configuration);
        this.id = id;
        this.configuredModel = fields?.modelName ?? '';
        this.configuredMaxToken = fields?.maxTokens;
    }
    revertToOriginalModel() {
        this.modelName = this.configuredModel;
        this.maxTokens = this.configuredMaxToken;
    }
    setMultiModalOption(multiModalOption) {
        this.multiModalOption = multiModalOption;
    }
    setVisionModel() {
        // pass
    }
}
exports.ChatOpenAI = ChatOpenAI;
//# sourceMappingURL=FlowiseChatOpenAI.js.map