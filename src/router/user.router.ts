import Router from "@koa/router";
import { fetch, get, save, update } from "../controllers/users.controller";

const router = new Router({ prefix: "/users" });

router.get("/", fetch);
router.post("/", save);
router.get("/:id", get);
router.put("/:id", update);

export default router;
