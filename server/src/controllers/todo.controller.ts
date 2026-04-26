import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import * as service from "../services/todo.service";

export async function getTodos(req: AuthRequest, res: Response) {
  const { page, limit, completed, search } = req.query;

  const todos = await service.getTodos({
    userId: req.user!.userId,
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
    completed:
      completed === "true"
        ? true
        : completed === "false"
        ? false
        : undefined,
    search: search as string | undefined,
  });

  res.json(todos);
}

export async function getTodoById(req: AuthRequest, res: Response) {
  try {
    const todo = await service.getTodoById(
      Number(req.params.id),
      req.user!.userId
    );

    res.json(todo);
  } catch {
    res.status(404).json({ message: "Todo not found" });
  }
}

export async function createTodo(req: AuthRequest, res: Response) {
  try {
    const todo = await service.createTodo(
      req.body.title,
      req.user!.userId
    );

    res.status(201).json(todo);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}

export async function updateTodo(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const todo = await service.updateTodo(
      Number(id),
      userId,
      req.body
    );

    res.json(todo); // 🔥 ВАЖЛИВО
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteTodo(req: AuthRequest, res: Response) {
  try {
    await service.deleteTodo(
      Number(req.params.id),
      req.user!.userId
    );

    res.sendStatus(204);
  } catch {
    res.status(404).json({ message: "Todo not found" });
  }
}


export async function deleteCompleted(req: AuthRequest, res: Response) {
  try {
    await service.deleteCompleted(req.user!.userId);

    res.sendStatus(204);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}