import winston from "winston";
import colors from "@colors/colors/safe";
import { TransformableInfo } from "logform";
import { DateTime } from "luxon";

import { settings } from "./settings";

const { test } = settings;

const formatter = (info: TransformableInfo, opts?: any) => {
    const { timestamp, level, message, ...args } = info;
    const tz = DateTime.fromISO(info.timestamp).toFormat("yyyy-MM-dd HH:mm:ss.SSS");
    const text = [
        colors.magenta(tz),
        info.level,
        colors.gray(`[${process.pid}]`),
        colors.gray(info.message)
    ].join("\t");
    return colors.gray(text);
};

// Define the Winston logger configuration
export const logger = winston.createLogger({
    silent: test,
    level: "info",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(formatter)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/application.log" })
    ]
});
