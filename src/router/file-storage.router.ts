import Router from "@koa/router";

import multer from "../multer";
import { upload } from "../controllers/file-storage.controller";

const router = new Router({ prefix: "/api/fs" });

router.post("/", multer.single("file"), upload);

export default router;
