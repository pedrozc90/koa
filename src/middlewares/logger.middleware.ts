import { Stream } from "stream";
import { Context, Next } from "koa";
import bytes from "bytes";
import colors from "@colors/colors/safe";

import logger from "../logger";
import { formatTime } from "../utils";
import * as StreamUtils from "../utils/stream";
import { HttpStatusMessage } from "../types";

const COLOR_CODES: Record<number, (s: string) => string> = {
    7: colors.magenta,
    5: colors.red,
    4: colors.yellow,
    3: colors.cyan,
    2: colors.green,
    1: colors.green,
    0: colors.gray
};

const METHOD_COLOR: Record<string, (s: string) => string> = {
    "GET": colors.green,
    "POST": colors.yellow,
    "PUT": colors.blue,
    "PATCH": colors.magenta,
    "DELETE": colors.red,
    "HEAD": colors.green,
    "OPTIONS": colors.green
};

const log = (level: string = "info", ctx: Context, start_time: number, length: number | null, error: any, event?: unknown): void => {
    const color_method = METHOD_COLOR[ctx.method] || colors.gray;

    // get the status code of the response
    const status_code = error
        ? (error.isBoom && error.output?.statusCode || error.status || 500)
        : (ctx.status || 404);

    const status_message = HttpStatusMessage[status_code];

    // set the color of the status code;
    const status_level = (status_code / 100) | 0;
    const color_status = COLOR_CODES[status_level] || COLOR_CODES[0];

    // get the human readable response length
    const length_fmt = (length) ? bytes.format(length) : null;

    const elapsed_ms = Date.now() - start_time;
    const elapsed_fmt = formatTime(elapsed_ms);

    const message = [
        color_method(ctx.method),
        ctx.originalUrl,
        "->",
        color_status(status_code),
        status_message,
        "|",
        `elapsed: ${elapsed_fmt}`,
        ",",
        (length_fmt) ? `payload: ${ length_fmt }` : ""
    ].join(" ");

    logger.log(level, message);
}

export const koaLogger = async (ctx: Context, next: Next): Promise<void> => {
    const start_time = Date.now();

    try {
        ctx.logger = logger;
        await next();
    } catch (err) {
        log("error", ctx, start_time, null, err);
        throw err;
    }

    // calculate the length of a streaming response
    // by intercepting the stream with a counter.
    // only necessary if a content-length header is currently not set.
    const body = ctx.body;
    let length: number | null = ctx.response.length;

    // const { body, response: { length } } = ctx;
    if (length === null && body && body instanceof Stream.Readable && body.readable) {
        let counter = new StreamUtils.Counter();
        ctx.body = body.pipe(counter)
            .on("end", () => {
                length = counter.length;
                console.log("total length:", length);
            })
            .on("error", ctx.onerror);
    }

    // log when the response is finished or closed,
    // whichever happens first.
    const { res } = ctx;

    const onfinish = done.bind(null, "finish");
    const onclose = done.bind(null, "close");

    res.once("finish", onfinish);
    res.once("close", onclose);

    function done(event: string) {
        res.removeListener("finish", onfinish);
        res.removeListener("close", onclose);
        log("info", ctx, start_time, length, null, event);
    }
}

export default koaLogger;
