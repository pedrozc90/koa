import { Context, Next } from "koa";

import config from "../config";
import { IPing } from "../types";
import { toLocalTimestamp } from "../utils/datetime";

export const index = (ctx: Context, next: Next) => {
    ctx.redirect("ping");
}

export const ping = (ctx: Context, next: Next) => {
    const timestamp = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const body: IPing = {
        env: config.env,
        timestamp,
        timestamp_locale: toLocalTimestamp(timestamp, timezone),
        timezone,
        app: {
            name: config.name,
            version: config.version
        }
    };

    ctx.status = 200;
    ctx.body = body;
}
