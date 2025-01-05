import { ICommonObject } from 'flowise-components';
import { DocumentStore } from './database/entities/DocumentStore';
export declare enum DocumentStoreStatus {
    EMPTY_SYNC = "EMPTY",
    SYNC = "SYNC",
    SYNCING = "SYNCING",
    STALE = "STALE",
    NEW = "NEW",
    UPSERTING = "UPSERTING",
    UPSERTED = "UPSERTED"
}
export interface IDocumentStore {
    id: string;
    name: string;
    description: string;
    loaders: string;
    whereUsed: string;
    updatedDate: Date;
    createdDate: Date;
    status: DocumentStoreStatus;
    vectorStoreConfig: string | null;
    embeddingConfig: string | null;
    recordManagerConfig: string | null;
}
export interface IDocumentStoreFileChunk {
    id: string;
    chunkNo: number;
    docId: string;
    storeId: string;
    pageContent: string;
    metadata: string;
}
export interface IDocumentStoreFileChunkPagedResponse {
    chunks: IDocumentStoreFileChunk[];
    count: number;
    characters: number;
    file?: IDocumentStoreLoader;
    currentPage: number;
    storeName: string;
    description: string;
    docId: string;
}
export interface IDocumentStoreLoader {
    id?: string;
    loaderId?: string;
    loaderName?: string;
    loaderConfig?: any;
    splitterId?: string;
    splitterName?: string;
    splitterConfig?: any;
    totalChunks?: number;
    totalChars?: number;
    status?: DocumentStoreStatus;
    storeId?: string;
    files?: IDocumentStoreLoaderFile[];
    source?: string;
    credential?: string;
}
export interface IDocumentStoreLoaderForPreview extends IDocumentStoreLoader {
    rehydrated?: boolean;
    preview?: boolean;
    previewChunkCount?: number;
}
export interface IDocumentStoreUpsertData {
    docId: string;
    loader?: {
        name: string;
        config: ICommonObject;
    };
    splitter?: {
        name: string;
        config: ICommonObject;
    };
    vectorStore?: {
        name: string;
        config: ICommonObject;
    };
    embedding?: {
        name: string;
        config: ICommonObject;
    };
    recordManager?: {
        name: string;
        config: ICommonObject;
    };
}
export interface IDocumentStoreRefreshData {
    items: IDocumentStoreUpsertData[];
}
export interface IDocumentStoreLoaderFile {
    id: string;
    name: string;
    mimePrefix: string;
    size: number;
    status: DocumentStoreStatus;
    uploaded: Date;
}
export interface IDocumentStoreWhereUsed {
    id: string;
    name: string;
}
export declare const addLoaderSource: (loader: IDocumentStoreLoader, isGetFileNameOnly?: boolean) => string;
export declare class DocumentStoreDTO {
    id: string;
    name: string;
    description: string;
    files: IDocumentStoreLoaderFile[];
    whereUsed: IDocumentStoreWhereUsed[];
    createdDate: Date;
    updatedDate: Date;
    status: DocumentStoreStatus;
    chunkOverlap: number;
    splitter: string;
    totalChunks: number;
    totalChars: number;
    chunkSize: number;
    loaders: IDocumentStoreLoader[];
    vectorStoreConfig: any;
    embeddingConfig: any;
    recordManagerConfig: any;
    constructor();
    static fromEntity(entity: DocumentStore): DocumentStoreDTO;
    static fromEntities(entities: DocumentStore[]): DocumentStoreDTO[];
    static toEntity(body: any): DocumentStore;
}