import Router from "@koa/router";
import { UserController } from "../controllers";
import { authorized } from "../middlewares";

const router = new Router({ prefix: "users" });

router.get("/", authorized, UserController.fetch);
router.post("/", UserController.create);
router.get("/:id", authorized, UserController.get);
router.put("/:id", authorized, UserController.update);
router.delete("/:id", authorized, UserController.remove);

export default router;
