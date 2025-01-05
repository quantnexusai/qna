import { DocumentStore } from '../../database/entities/DocumentStore';
import { ICommonObject, IDocument } from 'flowise-components';
import { IDocumentStoreFileChunkPagedResponse, IDocumentStoreLoader, IDocumentStoreLoaderForPreview, IDocumentStoreRefreshData, IDocumentStoreUpsertData, IDocumentStoreWhereUsed } from '../../Interface';
import { DocumentStoreFileChunk } from '../../database/entities/DocumentStoreFileChunk';
declare const _default: {
    updateDocumentStoreUsage: (chatId: string, storeId: string | undefined) => Promise<void>;
    deleteDocumentStore: (storeId: string) => Promise<{
        deleted: number | null | undefined;
    }>;
    createDocumentStore: (newDocumentStore: DocumentStore) => Promise<DocumentStore>;
    deleteLoaderFromDocumentStore: (storeId: string, docId: string) => Promise<DocumentStore>;
    getAllDocumentStores: () => Promise<DocumentStore[]>;
    getAllDocumentFileChunks: () => Promise<DocumentStoreFileChunk[]>;
    getDocumentStoreById: (storeId: string) => Promise<DocumentStore>;
    getUsedChatflowNames: (entity: DocumentStore) => Promise<IDocumentStoreWhereUsed[]>;
    getDocumentStoreFileChunks: (storeId: string, docId: string, pageNo?: number) => Promise<IDocumentStoreFileChunkPagedResponse>;
    updateDocumentStore: (documentStore: DocumentStore, updatedDocumentStore: DocumentStore) => Promise<DocumentStore>;
    previewChunks: (data: IDocumentStoreLoaderForPreview) => Promise<{
        chunks: IDocument<Record<string, any>>[];
        totalChunks: number;
        previewChunkCount: number | undefined;
    }>;
    saveProcessingLoader: (data: IDocumentStoreLoaderForPreview) => Promise<IDocumentStoreLoader>;
    processLoader: (data: IDocumentStoreLoaderForPreview, docLoaderId: string) => Promise<IDocumentStoreFileChunkPagedResponse>;
    deleteDocumentStoreFileChunk: (storeId: string, docId: string, chunkId: string) => Promise<IDocumentStoreFileChunkPagedResponse>;
    editDocumentStoreFileChunk: (storeId: string, docId: string, chunkId: string, content: string, metadata: ICommonObject) => Promise<IDocumentStoreFileChunkPagedResponse>;
    getDocumentLoaders: () => Promise<import("flowise-components").INode[]>;
    insertIntoVectorStore: (data: ICommonObject, isStrictSave?: boolean) => Promise<any>;
    getEmbeddingProviders: () => Promise<import("flowise-components").INode[]>;
    getVectorStoreProviders: () => Promise<import("flowise-components").INode[]>;
    getRecordManagerProviders: () => Promise<import("flowise-components").INode[]>;
    saveVectorStoreConfig: (data: ICommonObject, isStrictSave?: boolean) => Promise<DocumentStore>;
    queryVectorStore: (data: ICommonObject) => Promise<{
        timeTaken: number;
        docs: any;
    }>;
    deleteVectorStoreFromStore: (storeId: string) => Promise<void>;
    updateVectorStoreConfigOnly: (data: ICommonObject) => Promise<{}>;
    upsertDocStoreMiddleware: (storeId: string, data: IDocumentStoreUpsertData, files?: Express.Multer.File[], isRefreshExisting?: boolean) => Promise<any>;
    refreshDocStoreMiddleware: (storeId: string, data?: IDocumentStoreRefreshData) => Promise<any[]>;
    generateDocStoreToolDesc: (docStoreId: string, selectedChatModel: ICommonObject) => Promise<string>;
};
export default _default;
