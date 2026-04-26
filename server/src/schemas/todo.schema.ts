import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
});

export const updateTodoSchema = z
  .object({
    title: z.string().min(1).optional(),
    completed: z.boolean().optional(),
  })
  .refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'Invalid id'),
});

export const getTodosQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  completed: z.string().optional(),
  search: z.string().optional(),
});

/*
export const getTodosQuerySchema = z.object({
  userId: z
    .string()
    .regex(/^\d+$/, 'userId must be a number')
    .transform(val => Number(val))
    .optional(),
});
*/