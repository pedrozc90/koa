import pkg from "../../package.json" with { type: "json" };
import type { CorsSettings, DatabaseSettings, HashingSettings, JwtExpiresIn, JwtSettings, Settings } from "../types";
import { toInt } from "../utils";

function readEnv(name: string): string | undefined;
function readEnv(name: string, defaultValue: string): string;
function readEnv(name: string, defaultValue?: string): string | undefined {
    return process.env[name] ?? defaultValue;
}

const requiredEnv = (name: string): string => {
    const value = readEnv(name);
    if (!value) {
        throw new Error(`Environment '${name}' is not configured.`);
    }
    return value;
};

const requirePositiveInt = (name: string): number => {
    const env = readEnv(name);
    const value = toInt(env);
    if (typeof value !== "number") {
        throw new Error(`Environment '${name}' is not configured.`);
    }
    if (value <= 0) {
        throw new Error(`Environment '${name}' must be greater than 0.`);
    }
    return value;
};

/* --- Server --- */
const environment = process.env["NODE_ENV"] ?? "development";
const port = toInt(process.env["PORT"]) ?? 3000;

/* --- Cors --- */
const createCorsSettings = (): CorsSettings => {
    const origin = readEnv("ALLOWED_ORIGIN") ?? (environment === "development" ? `http://localhost:${port}` : undefined);
    if (!origin) {
        throw new Error("Environment 'ALLOWED_ORIGIN' is not configured.");
    }
    return { origin };
};

/* --- Database --- */
const createDatabaseSettings = (): DatabaseSettings => {
    return { url: requiredEnv("DATABASE_URL") };
};

/* --- Jwt --- */
const createJwtSettings = (): JwtSettings => {
    return {
        secret: requiredEnv("JWT_SECRET"),
        issuer: readEnv("JWT_ISSUER") ?? `${pkg.name}:${environment}`,
        expiresIn: readEnv("JWT_EXPIRES_IN", "1h") as JwtExpiresIn,
    };
};

/* --- Hashing --- */
const createHashingSettings = (): HashingSettings => {
    return {
        salt: requirePositiveInt("HASHING_SALT"),
        pepper: requiredEnv("HASHING_PEPPER"),
    };
};

export const settings: Settings = {
    name: pkg.name,
    version: pkg.version,
    environment,
    port,
    cors: createCorsSettings(),
    db: createDatabaseSettings(),
    jwt: createJwtSettings(),
    hashing: createHashingSettings(),
};
