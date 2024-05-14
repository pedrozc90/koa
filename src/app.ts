import Koa, { Context, Next } from "koa";
import helmet from "koa-helmet";
import bodyParser from "@koa/bodyparser";

import { settings, logger } from "./config";
import { koaLogger, onError, onPageNotFound } from "./middlewares";
import { fileStorageRouter, rootRouter, userRouter } from "./router";

export const init = async () => {
    const app = new Koa();

    app.use(onError());
    app.use(koaLogger);
    app.use(helmet());
    app.use(bodyParser());

    app.use(rootRouter.routes());
    app.use(rootRouter.allowedMethods());
    app.use(userRouter.routes());
    app.use(userRouter.allowedMethods());
    app.use(fileStorageRouter.routes());
    app.use(fileStorageRouter.allowedMethods());

    app.use(onPageNotFound());

    // error handler
    app.on("error", async (err: Error, ctx: Context) => {
        if (settings.env !== "test") {
            logger.error(err.stack);
        }
    });

    return app;
}
