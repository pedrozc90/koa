import Router from "@koa/router";
import { userController } from "../controllers";

const router = new Router({ prefix: "/users" });

router.get("/", userController.fetch);
router.post("/", userController.save);
router.get("/:id", userController.get);
router.put("/:id", userController.update);

export const userRouter = router;
