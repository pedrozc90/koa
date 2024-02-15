import { bodyParser } from "@koa/bodyparser";
import cors from "@koa/cors";
import Koa from "koa";
import helmet from "koa-helmet";

import { settings } from "./settings";
import { FileRouter, IndexRouter, UserRouter } from "./routes";
import { onError, onPageNotFound } from "./middlewares";

/* --- Express App --- */
export const init = async () => {
    const app = new Koa();

    // error handler, if any route throws a error, it should be pass through this middleware
    app.use(onError());

    // gzip compression
    // app.use(compression());

    // body parser params and attach them to req.body
    app.use(bodyParser());

    // secure apps by setting varius HTTP headers
    app.use(helmet());

    // enabl CORS (Cross Origin Resource Sharing)
    app.use(cors({ origin: settings.cors.origin, credentials: true }));

    // routes
    app.use(IndexRouter.routes());
    app.use(IndexRouter.allowedMethods());
    app.use(FileRouter.routes());
    app.use(FileRouter.allowedMethods());
    app.use(UserRouter.routes());
    app.use(UserRouter.allowedMethods());

    app.use(onPageNotFound());

    return app;
};
