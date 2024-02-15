import pkg from "../../package.json" with { type: "json" };
import type { Settings } from "../types";
import { toInt } from "../utils";

/* --- Server --- */
const environment = process.env["NODE_ENV"] ?? "development";
const port = toInt(process.env["PORT"]) ?? 3000;

/* --- Hashing --- */
const salt = toInt(process.env["HASHING_SALT"]);
if (typeof salt !== "number") {
    throw new Error("Environment 'HASHING_SALT' is not configured.");
} else if (salt <= 0) {
    throw new Error("Environment 'HASHING_SALT' must be greater than 0.");
}

const pepper = process.env["HASHING_PEPPER"];
if (typeof pepper !== "string" || !pepper.length) {
    throw new Error("Environment 'HASHING_PEPPER' is not configured.");
}

export const settings: Settings = {
    name: pkg.name,
    version: pkg.version,
    environment,
    port,
    cors: {
        origin: process.env["ALLOWED_ORIGIN"],
    },
    db: {
        url: process.env["DATABASE_URL"],
    },
    hashing: {
        salt: salt,
        pepper: pepper,
    },
};
