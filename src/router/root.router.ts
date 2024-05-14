import Router from "@koa/router";
import { rootController } from "../controllers";

const router = new Router();

router.get("/", rootController.index);
router.get("/ping", rootController.ping);

export const rootRouter = router;
