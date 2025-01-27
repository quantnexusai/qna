import { INodeParams, INodeCredential } from '../src/Interface'

class PostgresApi implements INodeCredential {
    label: string
    name: string
    version: number
    description: string
    inputs: INodeParams[]

    constructor() {
        this.label = 'Postgres API'
        this.name = 'PostgresApi'
        this.version = 1.0
        this.description =
            'Refer to <a target="_blank" href="https://hevodata.com/learn/postgresql-rest-api/">official guide</a> on how to get an API key for Postgres'
        this.inputs = [
            {
                label: 'User',
                name: 'user',
                type: 'string',
                placeholder: '<POSTGRES_USERNAME>'
            },
            {
                label: 'Password',
                name: 'password',
                type: 'password',
                placeholder: '<POSTGRES_PASSWORD>'
            }
        ]
    }
}

module.exports = { credClass: PostgresApi }
