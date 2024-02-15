import multer from "@koa/multer";

export const storage = multer.memoryStorage();
export const middleware = multer({ storage });
