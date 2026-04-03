import { Router } from "express";
import * as controller from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { createUserSchema, idParamSchema } from "../schemas/user.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(controller.getUsers));

router.get(
  "/:id",
  validate({ params: idParamSchema }),
  asyncHandler(controller.getUserById)
);

router.get(
  "/:id/todos",
  validate({ params: idParamSchema }),
  asyncHandler(controller.getUserTodos)
);

router.post(
  "/",
  validate({ body: createUserSchema }),
  asyncHandler(controller.createUser)
);

router.delete(
  "/:id",
  validate({ params: idParamSchema }),
  asyncHandler(controller.deleteUser)
);

export default router;