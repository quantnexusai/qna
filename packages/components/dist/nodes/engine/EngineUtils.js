"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reformatSourceDocuments = void 0;
const reformatSourceDocuments = (sourceNodes) => {
    const sourceDocuments = [];
    for (const node of sourceNodes) {
        sourceDocuments.push({
            pageContent: node.node.text,
            metadata: node.node.metadata
        });
    }
    return sourceDocuments;
};
exports.reformatSourceDocuments = reformatSourceDocuments;
//# sourceMappingURL=EngineUtils.js.map