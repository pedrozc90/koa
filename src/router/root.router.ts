import Router from "@koa/router";
import { index, ping } from "../controllers/root.controller";

const router = new Router();

router.get("/", index);
router.get("/ping", ping);

export default router;
