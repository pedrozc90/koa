import Router from "@koa/router";
import { index, healthCheck } from "../controllers/index.controller";

const router = new Router();

router.get("/", index);
router.get("/health", healthCheck);

export default router;
