import http from "http";
import Koa from "koa";
import supertest from "supertest";
import { DataSource } from "typeorm";

import { db } from "../src/config";
import { init } from "../src/app";

export class TestFactory {

    private _db!: DataSource;
    private _app!: Koa<Koa.DefaultState, Koa.DefaultContext>;
    private _server!: http.Server;
    private _agent!: supertest.Agent;

    public get db(): DataSource {
        return this._db;
    }

    public get app(): Koa<Koa.DefaultState, Koa.DefaultContext> {
        return this._app;
    }

    public get server(): http.Server {
        return this._server;
    }

    public get agent(): supertest.Agent {
        return this._agent;
    }

    public async init(): Promise<void> {
        try {
            this._db = await db.initialize();
            this._app = await init();
            this._server = this._app.listen(0);
            this._agent = supertest.agent(this._server);
        } catch (err) {
            console.error(err);
        }
    }

    public async close(): Promise<void> {
        this.server.close();
        await this.db.destroy();
    }

}
