import { z } from 'zod';


export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  userId: z.number().int().positive(),
});


export const updateTodoSchema = z.object({
  title: z.string().min(1).optional(),
  completed: z.boolean().optional(),
  userId: z.number().int().positive().optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});


export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'Invalid id'),
});