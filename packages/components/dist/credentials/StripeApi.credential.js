"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StripeApi {
    constructor() {
        this.label = 'Stripe API';
        this.name = 'stripeApi';
        this.version = 1.0;
        this.description =
            'Refer to <a target="_blank" href="https://docs.stripe.com/keys">official guide</a> on how to get an API key for Stripe';
        this.inputs = [
            {
                label: 'Stripe API Token',
                name: 'stripeApiToken',
                type: 'password',
                placeholder: '<STRIPE_API_TOKEN>'
            }
        ];
    }
}
module.exports = { credClass: StripeApi };
//# sourceMappingURL=StripeApi.credential.js.map