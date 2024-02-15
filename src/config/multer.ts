import multer from "@koa/multer";
import { settings } from "./settings";

const instance = multer({ dest: settings.storage });

export default instance;
