import type { Context, Next } from "koa";

export const onPageNotFound = () => {
    return async (ctx: Context, next: Next) => {
        try {
            await next();

            const status = ctx.status || 404;
            if (status === 404) {
                ctx.throw(404, "Page Not Found");
            }
        } catch (e) {
            if (e instanceof Error) {
                // some errors will have .status
                // however this is not a guarantee
                ctx.status = "status" in e ? (e.status as number) : 404;
                ctx.type = "json";
                ctx.body = { message: "Page Not Found" };
            }

            // since we handled this manually we'll
            // want to delegate to the regular app
            // level error handling as well so that
            // centralized still functions correctly.
            ctx.app.emit("error", e, ctx);
        }
    };
};

export const handler = (ctx: Context) => {
    ctx.status = 404;
    ctx.body = { message: `Oops.. resource '${ctx.request.path}' do not exists.` };
};
