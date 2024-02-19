import Router from "@koa/router";

import multer from "../config/multer";
import { fetch, generate, get, getContent, upload } from "../controllers/file-storage.controller";

const router = new Router({ prefix: "/api/fs" });

router.get("/", fetch);
router.post("/", multer.single("file"), upload);
router.get("/generate", generate);
router.get("/:id", get);
router.get("/:id/content", getContent);

export default router;
