import { INodeParams, INodeCredential } from '../src/Interface'

class QdrantApi implements INodeCredential {
    label: string
    name: string
    version: number
    description: string
    inputs: INodeParams[]

    constructor() {
        this.label = 'Qdrant API'
        this.name = 'qdrantApi'
        this.version = 1.0
        this.description =
            'Refer to <a target="_blank" href="https://qdrant.tech/documentation/cloud/authentication/">official guide</a> on how to create an API key for Qdrant'
        this.inputs = [
            {
                label: 'Qdrant API Key',
                name: 'qdrantApiKey',
                type: 'password'
            }
        ]
    }
}

module.exports = { credClass: QdrantApi }
