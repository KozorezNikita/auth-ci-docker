import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid id"),
});