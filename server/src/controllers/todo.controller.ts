import { Request, Response } from 'express';
import * as repo from '../repositories/todo.repo';





export async function getTodos(req: Request, res: Response) {
  const { page, limit, completed, search } = req.query;

  const todos = await repo.getTodos({
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
    completed: completed === "true" ? true :
           completed === "false" ? false :
           undefined,
    search: search as string | undefined,
  });

  res.json(todos);
}



/*
export async function getTodos(req: Request, res: Response) {
  const todos = await repo.getTodos();
  res.json(todos);
}
*/





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



export async function deleteCompleted(req: Request, res: Response) {
  await repo.deleteCompleted()
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

ТОДО РЕПО

export async function getTodos(userId?: number): Promise<Todo[]> {
  if (userId) {
    const result = await pool.query(
      'SELECT * FROM todos WHERE user_id = $1 ORDER BY id DESC',
      [userId]
    );

    return result.rows.map(mapTodo);
  }

  const result = await pool.query(
    'SELECT * FROM todos ORDER BY id DESC'
  );

  return result.rows.map(mapTodo);
}


ВАЛІДЕЙТ


if (query) {
      const result = query.safeParse(req.query);
      if (!result.success) {
        return res.status(400).json(result.error.format());
      }
      (req as any).validatedQuery = result.data;
    }








  
*/