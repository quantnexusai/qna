"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SingleStoreApi {
    constructor() {
        this.label = 'SingleStore API';
        this.name = 'singleStoreApi';
        this.version = 1.0;
        this.description =
            'Refer to <a target="_blank" href="https://docs.singlestore.com/cloud/reference/data-api/">official guide</a> on how to create an API key for SingleStore';
        this.inputs = [
            {
                label: 'User',
                name: 'user',
                type: 'string',
                placeholder: '<SINGLESTORE_USERNAME>'
            },
            {
                label: 'Password',
                name: 'password',
                type: 'password',
                placeholder: '<SINGLESTORE_PASSWORD>'
            }
        ];
    }
}
module.exports = { credClass: SingleStoreApi };
//# sourceMappingURL=SingleStoreApi.credential.js.map