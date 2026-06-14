import Router from "@koa/router";
import { IndexController } from "../controllers";
import { authorized } from "../middlewares";

const router = new Router();

router.get("/", IndexController.index);
router.get("/health", IndexController.healthCheck);
router.post("/login", IndexController.login);
router.post("/logout", authorized, IndexController.logout);
router.get("/me", authorized, IndexController.me);

export default router;
