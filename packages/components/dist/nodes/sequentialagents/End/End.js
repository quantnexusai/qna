"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const langgraph_1 = require("@langchain/langgraph");
class End_SeqAgents {
    constructor() {
        this.label = 'End';
        this.name = 'seqEnd';
        this.version = 2.0;
        this.type = 'End';
        this.icon = 'end.svg';
        this.category = 'Sequential Agents';
        this.description = 'End conversation';
        this.baseClasses = [this.type];
        this.documentation = 'https://docs.flowiseai.com/using-flowise/agentflows/sequential-agents#id-10.-end-node';
        this.inputs = [
            {
                label: 'Agent | Condition | LLM | Tool Node',
                name: 'sequentialNode',
                type: 'Agent | Condition | LLMNode | ToolNode'
            }
        ];
        this.hideOutput = true;
    }
    async init(nodeData) {
        const sequentialNode = nodeData.inputs?.sequentialNode;
        if (!sequentialNode)
            throw new Error('End must have a predecessor!');
        const returnOutput = {
            id: nodeData.id,
            node: langgraph_1.END,
            name: langgraph_1.END,
            label: langgraph_1.END,
            type: 'end',
            output: langgraph_1.END,
            predecessorAgents: [sequentialNode]
        };
        return returnOutput;
    }
}
module.exports = { nodeClass: End_SeqAgents };
//# sourceMappingURL=End.js.map