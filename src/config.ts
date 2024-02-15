import os from "os";
import path from "path";
import * as pkg from "../package.json";
import { IConfig } from "./types/config";

const env =  process.env.NODE_ENV || "development";
const port = (env !== "test") ? (Number(process.env.PORT) || 3000) : 0;

const config: IConfig = {
    name: pkg.name,
    version: pkg.version,
    env: env,
    port: port,
    storage: process.env.STORAGE || path.join(os.tmpdir(), pkg.name),
    logger: {
        level: "INFO",
        time_zone: "America/Sao_Paulo"
    }
};

export default config;
