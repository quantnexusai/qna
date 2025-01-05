"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class XaiApi {
    constructor() {
        this.label = 'Xai API';
        this.name = 'xaiApi';
        this.version = 1.0;
        this.description =
            'Refer to <a target="_blank" href="https://docs.x.ai/docs/overview">official guide</a> on how to create an API key on xAI';
        this.inputs = [
            {
                label: 'X AI API Key',
                name: 'xaiApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: XaiApi };
//# sourceMappingURL=XaiApi.credential.js.map