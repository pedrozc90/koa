import type { Context, Next } from "koa";
import { AuthService } from "../services";
import { AppError, UnauthorizedError } from "../types";

const BEARER = "Bearer";

export const authorized = (ctx: Context, next: Next) => {
    try {
        const authorization = ctx.request.header.authorization;
        if (!authorization || !authorization.trim().length || !authorization.startsWith(BEARER)) {
            throw new UnauthorizedError("Missing or invalid Authorization header");
        }

        const accessToken = authorization.substring(BEARER.length).trim();

        const jwt = AuthService.decode(accessToken);

        ctx.token = accessToken;
        ctx.jwt = jwt;

        return next();
    } catch (e) {
        if (e instanceof AppError) {
            ctx.status = 400;
            ctx.body = { message: e.message };
            return;
        }
        throw e;
    }
};
