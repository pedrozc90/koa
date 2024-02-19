import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import "reflect-metadata";

import { settings } from "./settingts";

const { env, database } = settings;

const opts: DataSourceOptions = {
    type: "postgres",
    host: database.host,
    port: database.port,
    username: database.user,
    password: database.pass,
    database: database.name,
    synchronize: false,
    logging: (env === "development"),
    entities: [
        // "src/entities/**/*.ts"
        path.resolve(`${ __dirname }/../entities/**.{js,ts}`)
    ],
    subscribers: [],
    migrations: [
        // "src/migrations/*.ts",
        path.resolve(`${ __dirname }/../migrations/**.{js,ts}`)
    ],
    migrationsRun: true,
    useUTC: true
};

export const db = new DataSource(opts);
