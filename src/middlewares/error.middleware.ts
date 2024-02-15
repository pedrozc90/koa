import type { Context, Next } from "koa";
import { AppError } from "../types";

export const onError = () => {
    return async (ctx: Context, next: Next) => {
        try {
            await next();
        } catch (e) {
            if (e instanceof AppError) {
                const status = e.status;
                ctx.status = status;
                ctx.body = { message: e.message };
            } else if (e instanceof Error) {
                console.error(e.stack);
                ctx.status = 500;
                ctx.body = { message: e.message };
            } else {
                console.error(e);
                ctx.status = 500;
                ctx.body = { message: "Something unexpexted happened." };
            }
            ctx.app.emit("error", e, ctx);
        }
    };
};
