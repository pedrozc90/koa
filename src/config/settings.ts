import os from "os";
import path from "path";

import * as pkg from "../../package.json";
import { ISettings } from "../types";

const env =  process.env.NODE_ENV || "development";
const port = (env !== "test") ? (Number(process.env.PORT) || 3000) : 0;

export const settings: ISettings = {
    env: env,
    test: (env === "test"),
    development: (env === "development"),
    name: pkg.name,
    version: pkg.version,
    port: port,
    storage: process.env.STORAGE || path.join(os.tmpdir(), pkg.name),
    logger: {
        level: "INFO",
        time_zone: "America/Sao_Paulo"
    },
    database: {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || "postgres",
        pass: process.env.DB_PASS || "postgres",
        name: process.env.DB_NAME || "development"
    }
    // jwt: {
    //     secret_key: process.env.JWT_SECRET_KEY || "x",
    //     expiration: process.env.JWT_EXPIRATION || "12h"
    // }
};
