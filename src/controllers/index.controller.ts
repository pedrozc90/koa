import { settings } from "../settings";
import { getTimezone } from "../utils";
import type { Context } from "koa";

interface HealthCheck {
    name: string;
    version: string;
    environment: string | undefined;
    timestamp: Date;
    timezone: string;
}

const createHealthCheck = (timestamp: Date = new Date()): HealthCheck => {
    const timezone = getTimezone();
    return {
        name: settings.name,
        version: settings.version,
        environment: settings.environment,
        timestamp: timestamp,
        timezone: timezone,
    };
};

export const index = (ctx: Context) => {
    ctx.redirect("/health");
};

export const healthCheck = (ctx: Context) => {
    const obj = createHealthCheck();
    ctx.status = 200;
    ctx.body = obj;
};
