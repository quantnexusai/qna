import { INodeParams, INodeCredential } from '../src/Interface'

class RedisCacheUrlApi implements INodeCredential {
    label: string
    name: string
    version: number
    description: string
    inputs: INodeParams[]

    constructor() {
        this.label = 'Redis URL'
        this.name = 'redisCacheUrlApi'
        this.version = 1.0
        this.description =
            'Refer to <a target="_blank" href="https://redis.io/docs/latest/operate/rc/api/get-started/use-rest-api/">official guide</a> on how to create an API key for Redis Cache URL'
        this.inputs = [
            {
                label: 'Redis URL',
                name: 'redisUrl',
                type: 'string',
                default: 'redis://localhost:6379'
            }
        ]
    }
}

module.exports = { credClass: RedisCacheUrlApi }
