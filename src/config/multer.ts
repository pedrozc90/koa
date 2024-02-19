import koaMulter from "@koa/multer";
import { settings } from "./settingts";

const multer = koaMulter({ dest: settings.storage });

export default multer;
