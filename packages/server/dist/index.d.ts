import express from 'express';
import { Server } from 'socket.io';
import { DataSource } from 'typeorm';
import { IChatFlow } from './Interface';
import { NodesPool } from './NodesPool';
import { ChatflowPool } from './ChatflowPool';
import { CachePool } from './CachePool';
import { Telemetry } from './utils/telemetry';
import { SSEStreamer } from './utils/SSEStreamer';
import { IMetricsProvider } from './Interface.Metrics';
import 'global-agent/bootstrap';
declare global {
    namespace Express {
        interface Request {
            io?: Server;
        }
    }
}
export declare class App {
    app: express.Application;
    nodesPool: NodesPool;
    chatflowPool: ChatflowPool;
    cachePool: CachePool;
    telemetry: Telemetry;
    AppDataSource: DataSource;
    sseStreamer: SSEStreamer;
    metricsProvider: IMetricsProvider;
    constructor();
    initDatabase(): Promise<void>;
    config(socketIO?: Server): Promise<void>;
    stopApp(): Promise<void>;
}
export declare function getAllChatFlow(): Promise<IChatFlow[]>;
export declare function start(): Promise<void>;
export declare function getInstance(): App | undefined;
