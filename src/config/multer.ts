import multer from "@koa/multer";
import { settings } from "./settingts";

const instance = multer({ dest: settings.storage });

export default instance;
