"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpstashVectorApi {
    constructor() {
        this.label = 'Upstash Vector API';
        this.name = 'upstashVectorApi';
        this.version = 1.0;
        this.description =
            'Refer to <a target="_blank" href="https://upstash.com/docs/vector/api/get-started">official guide</a> on how to create an API key for Upstash Vector';
        this.inputs = [
            {
                label: 'Upstash Vector REST URL',
                name: 'UPSTASH_VECTOR_REST_URL',
                type: 'string'
            },
            {
                label: 'Upstash Vector REST Token',
                name: 'UPSTASH_VECTOR_REST_TOKEN',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: UpstashVectorApi };
//# sourceMappingURL=UpstashVectorApi.credential.js.map