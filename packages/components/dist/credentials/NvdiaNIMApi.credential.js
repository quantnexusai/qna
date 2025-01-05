"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NvdiaNIMApi {
    constructor() {
        this.label = 'Nvdia NIM API Key';
        this.name = 'nvdiaNIMApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Nvdia NIM API Key',
                name: 'nvdiaNIMApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: NvdiaNIMApi };
//# sourceMappingURL=NvdiaNIMApi.credential.js.map