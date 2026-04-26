import { Router } from "express";
import * as controller from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { createUserSchema, idParamSchema } from "../schemas/user.schema";
import { asyncHandler } from "../utils/asyncHandler";
import { auth } from "../middlewares/auth";

const router = Router();

router.use(auth);

router.get("/", asyncHandler(controller.getUsers));

router.get(
  "/:id",
  validate({ params: idParamSchema }),
  asyncHandler(controller.getUserById)
);

/*router.get(
  "/:id/todos",
  validate({ params: idParamSchema }),
  asyncHandler(controller.getUserTodos)
);*/



router.delete(
  "/:id",
  validate({ params: idParamSchema }),
  asyncHandler(controller.deleteUser)
);

export default router;