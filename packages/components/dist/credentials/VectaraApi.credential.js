"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VectaraAPI {
    constructor() {
        this.label = 'Vectara API';
        this.name = 'vectaraApi';
        this.version = 1.0;
        this.description =
            'Refer to <a target="_blank" href="https://docs.vectara.com/docs/api-reference/api-overview">official guide</a> on how to create an API key on Vectara';
        this.inputs = [
            {
                label: 'Vectara Customer ID',
                name: 'customerID',
                type: 'string'
            },
            {
                label: 'Vectara Corpus ID',
                name: 'corpusID',
                type: 'string'
            },
            {
                label: 'Vectara API Key',
                name: 'apiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: VectaraAPI };
//# sourceMappingURL=VectaraApi.credential.js.map