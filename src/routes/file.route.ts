import Router from "@koa/router";
import { multer } from "../settings";
import { FileController } from "../controllers";

const router = new Router({ prefix: "/files" });

router.get("/", FileController.fetch);
router.post("/", multer.single("file"), FileController.upload);
router.get("/:id", FileController.download);
router.delete("/:id", FileController.remove);

export default router;
