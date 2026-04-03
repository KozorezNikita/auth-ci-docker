import { Request, Response } from "express";
import * as repo from "../repositories/user.repo";

export async function createUser(req: Request, res: Response) {
  const { name } = req.body;

  const user = await repo.createUser(name);

  res.status(201).json(user);
}

export async function getUsers(req: Request, res: Response) {
  const users = await repo.getUsers();
  res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  const id = Number(req.params.id);

  const user = await repo.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
}

export async function getUserTodos(req: Request, res: Response) {
  const id = Number(req.params.id);

  const user = await repo.getUserWithTodos(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  await repo.deleteUser(id);

  res.sendStatus(204);
}