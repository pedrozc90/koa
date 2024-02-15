import winston from "winston";

declare module "koa" {
    interface Context {
        logger: winston.Logger
    }
}