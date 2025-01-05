"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainTool = void 0;
const tools_1 = require("@langchain/core/tools");
const utils_1 = require("../../../src/utils");
const src_1 = require("../../../src");
class ChainTool extends tools_1.DynamicTool {
    constructor({ chain, ...rest }) {
        super({
            ...rest,
            func: async (input, runManager) => {
                const childManagers = runManager?.getChild();
                const handlers = childManagers?.handlers?.filter((handler) => !(handler instanceof src_1.CustomChainHandler)) || [];
                if (childManagers)
                    childManagers.handlers = handlers;
                if (chain.prompt && chain.prompt.promptValues) {
                    const promptValues = (0, utils_1.handleEscapeCharacters)(chain.prompt.promptValues, true);
                    const values = await chain.call(promptValues, childManagers);
                    return values?.text;
                }
                const values = chain.run(input, childManagers);
                return values;
            }
        });
        this.chain = chain;
    }
}
exports.ChainTool = ChainTool;
//# sourceMappingURL=core.js.map