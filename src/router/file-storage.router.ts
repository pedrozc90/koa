import Router from "@koa/router";

import multer from "../config/multer";
import { fetch, upload, get, getContent } from "../controllers/file-storage.controller";

const router = new Router({ prefix: "/file-storage" });

router.get("/", fetch);
router.post("/", multer.single("file"), upload);
router.get("/:id", get);
router.get("/:id/content", getContent);

export default router;
