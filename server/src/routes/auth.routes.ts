import { Router } from "express";
import * as controller from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
  "/register",
  validate({ body: registerSchema }),
  asyncHandler(controller.register)
);

router.post(
  "/login",
  validate({ body: loginSchema }),
  asyncHandler(controller.login)
);

export default router;