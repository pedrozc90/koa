import { Context, Next } from "koa";

import { IPing } from "../types";
import { settings } from "../config";
import { toLocalTimestamp } from "../utils";

const { env, name, version } = settings;

export const index = (ctx: Context, next: Next) => {
    ctx.redirect("ping");
}

export const ping = (ctx: Context, next: Next) => {
    const timestamp = new Date();
    const time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const body: IPing = {
        env: env,
        timestamp: timestamp,
        local_timestamp: toLocalTimestamp(timestamp, time_zone),
        time_zone: time_zone,
        app: {
            name: name,
            version: version
        }
    };

    ctx.status = 200;
    ctx.body = body;
}
