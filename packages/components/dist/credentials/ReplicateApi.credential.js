"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReplicateApi {
    constructor() {
        this.label = 'Replicate API';
        this.name = 'replicateApi';
        this.version = 1.0;
        this.description =
            'Refer to <a target="_blank" href="https://replicate.com/docs">official guide</a> on how to create an API key for Replicate';
        this.inputs = [
            {
                label: 'Replicate Api Key',
                name: 'replicateApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: ReplicateApi };
//# sourceMappingURL=ReplicateApi.credential.js.map