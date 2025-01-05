import { VectorStoreDriver } from './Base';
import { PGVectorStore, PGVectorStoreArgs } from '@langchain/community/vectorstores/pgvector';
import { Document } from '@langchain/core/documents';
import { PoolConfig } from 'pg';
export declare class PGVectorDriver extends VectorStoreDriver {
    static CONTENT_COLUMN_NAME_DEFAULT: string;
    protected _postgresConnectionOptions: PoolConfig;
    protected getPostgresConnectionOptions(): Promise<PoolConfig>;
    getArgs(): Promise<PGVectorStoreArgs>;
    instanciate(metadataFilters?: any): Promise<PGVectorStore>;
    fromDocuments(documents: Document[]): Promise<PGVectorStore>;
    protected adaptInstance(instance: PGVectorStore, metadataFilters?: any): Promise<PGVectorStore>;
}
