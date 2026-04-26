import { Request, Response } from "express";
import * as service from "../services/user.service";

export async function getUsers(req: Request, res: Response) {
  const users = await service.getUsers();
  res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  try {
    const user = await service.getUserById(Number(req.params.id));
    res.json(user);
  } catch {
    res.status(404).json({ message: "User not found" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  await service.deleteUser(Number(req.params.id));
  res.sendStatus(204);
}