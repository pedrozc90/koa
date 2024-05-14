import koaMulter from "@koa/multer";
import { settings } from "./settings";

export const multer = koaMulter({ dest: settings.storage });
