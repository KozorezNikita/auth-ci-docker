import { Request, Response } from 'express';
import * as repo from '../repositories/todo.repo';
import { createTodoSchema, idParamSchema, updateTodoSchema } from '../schemas/todo.schema';






export async function getTodos(req: Request, res: Response) {
  const todos = await repo.getTodos();
  res.json(todos);
}






export async function getTodoById(req: Request, res: Response) {
  const { id } = req.params;

  const todo = await repo.getTodoById(Number(id));

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.json(todo);
}





export async function createTodo(req: Request, res: Response) {
  const { title, userId } = req.body;

  const todo = await repo.createTodo(title, userId);

  res.status(201).json(todo);
}







export async function updateTodo(req: Request, res: Response) {
  const { id } = req.params;

  const updated = await repo.updateTodo(Number(id), req.body);

  res.json(updated);
}









export async function deleteTodo(req: Request, res: Response) {
  const { id } = req.params;

  await repo.deleteTodo(Number(id));

  res.sendStatus(204);
}

/*

функціонал додавання запиту по квері Юзер айді

СХЕМА
import { z } from 'zod';

export const getTodosQuerySchema = z.object({
  userId: z
    .string()
    .regex(/^\d+$/, 'userId must be a number')
    .transform(val => Number(val))
    .optional(),
});



РОУТ

router.get(
  '/',
  validate({ query: getTodosQuerySchema }),
  controller.getTodos
);


КОНТРОЛЛЕР

export async function getTodos(req: Request, res: Response) {
  const { userId } = req.query as { userId?: number };

  const todos = await repo.getTodos(userId);

  res.json(todos);
}
  
*/