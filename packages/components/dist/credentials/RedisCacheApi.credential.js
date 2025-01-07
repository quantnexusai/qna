"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RedisCacheApi {
    constructor() {
        this.label = 'Redis API';
        this.name = 'redisCacheApi';
        this.version = 1.0;
        this.description =
            'Refer to <a target="_blank" href="https://redis.io/learn/howtos/solutions/microservices/api-gateway-caching">official guide</a> on how to use Redis for API Gateway Caching';
        this.inputs = [
            {
                label: 'Redis Host',
                name: 'redisCacheHost',
                type: 'string',
                default: '127.0.0.1'
            },
            {
                label: 'Port',
                name: 'redisCachePort',
                type: 'number',
                default: '6379'
            },
            {
                label: 'User',
                name: 'redisCacheUser',
                type: 'string',
                placeholder: '<REDIS_USERNAME>'
            },
            {
                label: 'Password',
                name: 'redisCachePwd',
                type: 'password',
                placeholder: '<REDIS_PASSWORD>'
            },
            {
                label: 'Use SSL',
                name: 'redisCacheSslEnabled',
                type: 'boolean'
            }
        ];
    }
}
module.exports = { credClass: RedisCacheApi };
//# sourceMappingURL=RedisCacheApi.credential.js.map