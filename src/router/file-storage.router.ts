import Router from "@koa/router";

import { multer } from "../config";
import { fileStorageController } from "../controllers";

const router = new Router({ prefix: "/file-storage" });

router.get("/", fileStorageController.fetch);
router.post("/", multer.single("file"), fileStorageController.upload);
router.get("/:id", fileStorageController.get);
router.get("/:id/content", fileStorageController.content);

export const fileStorageRouter = router;
