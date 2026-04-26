import { Request, Response } from "express";
import * as service from "../services/auth.service";

export async function register(req: Request, res: Response) {
  try {
    const user = await service.register(
      req.body.name,
      req.body.email,
      req.body.password
    );

    res.status(201).json(user);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const data = await service.login(
      req.body.email,
      req.body.password
    );

    res.json(data);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}