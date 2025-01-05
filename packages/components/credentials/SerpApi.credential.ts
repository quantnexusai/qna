import { INodeParams, INodeCredential } from '../src/Interface'

class SerpApi implements INodeCredential {
    label: string
    name: string
    version: number
    description: string
    inputs: INodeParams[]

    constructor() {
        this.label = 'Serp API'
        this.name = 'serpApi'
        this.version = 1.0
        this.description =
            'Refer to <a target="_blank" href="https://serpapi.com/search-api">official guide</a> on how to create an API key for Serp API'
        this.inputs = [
            {
                label: 'Serp Api Key',
                name: 'serpApiKey',
                type: 'password'
            }
        ]
    }
}

module.exports = { credClass: SerpApi }
