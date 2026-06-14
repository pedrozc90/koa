import type { Context } from "koa";
import { LoginSchema } from "../schemas";
import { AuthService } from "../services";
import { settings } from "../settings";
import { getTimezone } from "../utils";

interface HealthCheck {
    name: string;
    version: string;
    environment: string | undefined;
    timestamp: Date;
    timezone: string;
}

export interface AuthRequest {
    email: string;
    password: string;
}

interface AuthResponse {
    accessToken: string;
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

export const login = async (ctx: Context) => {
    const data = LoginSchema.parse(ctx.request.body);
    const accessToken = await AuthService.login(data.email, data.password);
    const result: AuthResponse = { accessToken };
    ctx.status = 200;
    ctx.body = result;
};

export const logout = async (ctx: Context) => {
    ctx.status = 200;
    ctx.body = { accessToken: ctx.token };
};

export const me = async (ctx: Context) => {
    ctx.status = 200;
    ctx.body = ctx.jwt;
};
