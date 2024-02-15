import Koa, { Context } from "koa";
import helmet from "koa-helmet";
import bodyParser from "@koa/bodyparser";

import config from "./config";
import rootRouter from "./router/root.router";
import userRouter from "./router/user.router";
import fileStorageRouter from "./router/file-storage.router";
import { pageNotFound, koaLogger } from "./middlewares";

const app = new Koa();

app.use(koaLogger);
app.use(helmet());
app.use(bodyParser());

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.use(fileStorageRouter.routes());
app.use(fileStorageRouter.allowedMethods());

app.use(pageNotFound);

// error handler
app.on("error", async (err: Error, ctx: Context) => {
    ctx.logger.error(err);
    if (config.env !== "test") {
        ctx.type = "json";
        ctx.body = { message: err.message };
    }
});

export default app;
