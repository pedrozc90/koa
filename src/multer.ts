import multer from "@koa/multer";
import config from "./config";

const instance = multer({ dest: config.storage });

export default instance;
