import { JwtPayload } from "./services/auth.service";

declare module "koa" {
    interface Context {
        token?: string;
        jwt: JwtPayload;
    }
}
