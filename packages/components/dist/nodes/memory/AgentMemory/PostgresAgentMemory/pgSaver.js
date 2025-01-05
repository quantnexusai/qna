"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresSaver = void 0;
const langgraph_1 = require("@langchain/langgraph");
const typeorm_1 = require("typeorm");
const utils_1 = require("../../../../src/utils");
class PostgresSaver extends langgraph_1.BaseCheckpointSaver {
    constructor(config, serde) {
        super(serde);
        this.tableName = 'checkpoints';
        this.config = config;
        const { threadId } = config;
        this.threadId = threadId;
    }
    async getDataSource() {
        const { datasourceOptions } = this.config;
        if (!datasourceOptions) {
            throw new Error('No datasource options provided');
        }
        // Prevent using default MySQL port, otherwise will throw uncaught error and crashing the app
        if (datasourceOptions.port === 3006) {
            throw new Error('Invalid port number');
        }
        const dataSource = new typeorm_1.DataSource(datasourceOptions);
        await dataSource.initialize();
        return dataSource;
    }
    async setup(dataSource) {
        if (this.isSetup) {
            return;
        }
        try {
            const queryRunner = dataSource.createQueryRunner();
            await queryRunner.manager.query(`
CREATE TABLE IF NOT EXISTS ${this.tableName} (
    thread_id TEXT NOT NULL,
    checkpoint_id TEXT NOT NULL,
    parent_id TEXT,
    checkpoint BYTEA,
    metadata BYTEA,
    PRIMARY KEY (thread_id, checkpoint_id));`);
            await queryRunner.release();
        }
        catch (error) {
            console.error(`Error creating ${this.tableName} table`, error);
            throw new Error(`Error creating ${this.tableName} table`);
        }
        this.isSetup = true;
    }
    async getTuple(config) {
        const dataSource = await this.getDataSource();
        await this.setup(dataSource);
        const thread_id = config.configurable?.thread_id || this.threadId;
        const checkpoint_id = config.configurable?.checkpoint_id;
        if (checkpoint_id) {
            try {
                const queryRunner = dataSource.createQueryRunner();
                const keys = [thread_id, checkpoint_id];
                const sql = `SELECT checkpoint, parent_id, metadata FROM ${this.tableName} WHERE thread_id = $1 AND checkpoint_id = $2`;
                const rows = await queryRunner.manager.query(sql, keys);
                await queryRunner.release();
                if (rows && rows.length > 0) {
                    return {
                        config,
                        checkpoint: (await this.serde.parse(rows[0].checkpoint.toString())),
                        metadata: (await this.serde.parse(rows[0].metadata.toString())),
                        parentConfig: rows[0].parent_id
                            ? {
                                configurable: {
                                    thread_id,
                                    checkpoint_id: rows[0].parent_id
                                }
                            }
                            : undefined
                    };
                }
            }
            catch (error) {
                console.error(`Error retrieving ${this.tableName}`, error);
                throw new Error(`Error retrieving ${this.tableName}`);
            }
            finally {
                await dataSource.destroy();
            }
        }
        else {
            try {
                const queryRunner = dataSource.createQueryRunner();
                const keys = [thread_id];
                const sql = `SELECT thread_id, checkpoint_id, parent_id, checkpoint, metadata FROM ${this.tableName} WHERE thread_id = $1 ORDER BY checkpoint_id DESC LIMIT 1`;
                const rows = await queryRunner.manager.query(sql, keys);
                await queryRunner.release();
                if (rows && rows.length > 0) {
                    return {
                        config: {
                            configurable: {
                                thread_id: rows[0].thread_id,
                                checkpoint_id: rows[0].checkpoint_id
                            }
                        },
                        checkpoint: (await this.serde.parse(rows[0].checkpoint)),
                        metadata: (await this.serde.parse(rows[0].metadata)),
                        parentConfig: rows[0].parent_id
                            ? {
                                configurable: {
                                    thread_id: rows[0].thread_id,
                                    checkpoint_id: rows[0].parent_id
                                }
                            }
                            : undefined
                    };
                }
            }
            catch (error) {
                console.error(`Error retrieving ${this.tableName}`, error);
                throw new Error(`Error retrieving ${this.tableName}`);
            }
            finally {
                await dataSource.destroy();
            }
        }
        return undefined;
    }
    async *list(config, limit, before) {
        const dataSource = await this.getDataSource();
        await this.setup(dataSource);
        const queryRunner = dataSource.createQueryRunner();
        const thread_id = config.configurable?.thread_id || this.threadId;
        let sql = `SELECT thread_id, checkpoint_id, parent_id, checkpoint, metadata FROM ${this.tableName} WHERE thread_id = $1`;
        const args = [thread_id];
        if (before?.configurable?.checkpoint_id) {
            sql += ' AND checkpoint_id < $2';
            args.push(before.configurable.checkpoint_id);
        }
        sql += ' ORDER BY checkpoint_id DESC';
        if (limit) {
            sql += ` LIMIT ${limit}`;
        }
        try {
            const rows = await queryRunner.manager.query(sql, args);
            await queryRunner.release();
            if (rows && rows.length > 0) {
                for (const row of rows) {
                    yield {
                        config: {
                            configurable: {
                                thread_id: row.thread_id,
                                checkpoint_id: row.checkpoint_id
                            }
                        },
                        checkpoint: (await this.serde.parse(rows[0].checkpoint.toString())),
                        metadata: (await this.serde.parse(rows[0].metadata.toString())),
                        parentConfig: row.parent_id
                            ? {
                                configurable: {
                                    thread_id: row.thread_id,
                                    checkpoint_id: row.parent_id
                                }
                            }
                            : undefined
                    };
                }
            }
        }
        catch (error) {
            console.error(`Error listing ${this.tableName}`, error);
            throw new Error(`Error listing ${this.tableName}`);
        }
        finally {
            await dataSource.destroy();
        }
    }
    async put(config, checkpoint, metadata) {
        const dataSource = await this.getDataSource();
        await this.setup(dataSource);
        if (!config.configurable?.checkpoint_id)
            return {};
        try {
            const queryRunner = dataSource.createQueryRunner();
            const row = [
                config.configurable?.thread_id || this.threadId,
                checkpoint.id,
                config.configurable?.checkpoint_id,
                Buffer.from(this.serde.stringify(checkpoint)), // Encode to binary
                Buffer.from(this.serde.stringify(metadata)) // Encode to binary
            ];
            const query = `INSERT INTO ${this.tableName} (thread_id, checkpoint_id, parent_id, checkpoint, metadata)
                           VALUES ($1, $2, $3, $4, $5)
                           ON CONFLICT (thread_id, checkpoint_id)
                           DO UPDATE SET checkpoint = EXCLUDED.checkpoint, metadata = EXCLUDED.metadata`;
            await queryRunner.manager.query(query, row);
            await queryRunner.release();
        }
        catch (error) {
            console.error('Error saving checkpoint', error);
            throw new Error('Error saving checkpoint');
        }
        finally {
            await dataSource.destroy();
        }
        return {
            configurable: {
                thread_id: config.configurable?.thread_id || this.threadId,
                checkpoint_id: checkpoint.id
            }
        };
    }
    async delete(threadId) {
        if (!threadId) {
            return;
        }
        const dataSource = await this.getDataSource();
        await this.setup(dataSource);
        const query = `DELETE FROM "${this.tableName}" WHERE thread_id = $1;`;
        try {
            const queryRunner = dataSource.createQueryRunner();
            await queryRunner.manager.query(query, [threadId]);
            await queryRunner.release();
        }
        catch (error) {
            console.error(`Error deleting thread_id ${threadId}`, error);
        }
        finally {
            await dataSource.destroy();
        }
    }
    async getChatMessages(overrideSessionId = '', returnBaseMessages = false, prependMessages) {
        if (!overrideSessionId)
            return [];
        const chatMessage = await this.config.appDataSource.getRepository(this.config.databaseEntities['ChatMessage']).find({
            where: {
                sessionId: overrideSessionId,
                chatflowid: this.config.chatflowid
            },
            order: {
                createdDate: 'ASC'
            }
        });
        if (prependMessages?.length) {
            chatMessage.unshift(...prependMessages);
        }
        if (returnBaseMessages) {
            return await (0, utils_1.mapChatMessageToBaseMessage)(chatMessage);
        }
        let returnIMessages = [];
        for (const m of chatMessage) {
            returnIMessages.push({
                message: m.content,
                type: m.role
            });
        }
        return returnIMessages;
    }
    async addChatMessages() {
        // Empty as it's not being used
    }
    async clearChatMessages(overrideSessionId = '') {
        await this.delete(overrideSessionId);
    }
}
exports.PostgresSaver = PostgresSaver;
//# sourceMappingURL=pgSaver.js.map