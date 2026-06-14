import Router from "@koa/router";
import { FileController } from "../controllers";
import { authorized } from "../middlewares";
import { multer } from "../settings";

const router = new Router({ prefix: "/files" });

router.get("/", authorized, FileController.fetch);
router.post("/", authorized, multer.single("file"), FileController.upload);
router.get("/:id", authorized, FileController.download);
router.delete("/:id", authorized, FileController.remove);

export default router;
