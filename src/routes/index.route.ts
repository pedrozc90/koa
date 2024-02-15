import Router from "@koa/router";
import { IndexController } from "../controllers";

const router = new Router();

router.get("/", IndexController.index);
router.get("/health", IndexController.healthCheck);

export default router;
