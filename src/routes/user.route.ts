import Router from "@koa/router";
import { UserController } from "../controllers";

const router = new Router({ prefix: "users" });

router.get("/", UserController.fetch);
router.post("/", UserController.create);
router.get("/:id", UserController.get);
router.put("/:id", UserController.update);

export default router;
