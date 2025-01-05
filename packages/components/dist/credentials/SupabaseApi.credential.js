"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SupabaseApi {
    constructor() {
        this.label = 'Supabase API';
        this.name = 'supabaseApi';
        this.version = 1.0;
        this.description =
            'Refer to <a target="_blank" href="https://supabase.com/docs/guides/api">official guide</a> on how to create an API key for Supabase';
        this.inputs = [
            {
                label: 'Supabase API Key',
                name: 'supabaseApiKey',
                type: 'password'
            }
        ];
    }
}
module.exports = { credClass: SupabaseApi };
//# sourceMappingURL=SupabaseApi.credential.js.map