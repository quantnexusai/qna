"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorStoreDriver = void 0;
const src_1 = require("../../../../src");
const utils_1 = require("../utils");
class VectorStoreDriver {
    constructor(nodeData, options) {
        this.nodeData = nodeData;
        this.options = options;
    }
    async adaptInstance(instance, _metaDataFilters) {
        return instance;
    }
    getHost() {
        return (0, utils_1.getHost)(this.nodeData);
    }
    getPort() {
        return (0, utils_1.getPort)(this.nodeData);
    }
    getDatabase() {
        return (0, utils_1.getDatabase)(this.nodeData);
    }
    getTableName() {
        return (0, utils_1.getTableName)(this.nodeData);
    }
    getEmbeddings() {
        return this.nodeData.inputs?.embeddings;
    }
    async getCredentials() {
        const credentialData = await (0, src_1.getCredentialData)(this.nodeData.credential ?? '', this.options);
        const user = (0, src_1.getCredentialParam)('user', credentialData, this.nodeData, process.env.POSTGRES_VECTORSTORE_USER);
        const password = (0, src_1.getCredentialParam)('password', credentialData, this.nodeData, process.env.POSTGRES_VECTORSTORE_PASSWORD);
        return {
            user,
            password
        };
    }
}
exports.VectorStoreDriver = VectorStoreDriver;
//# sourceMappingURL=Base.js.map