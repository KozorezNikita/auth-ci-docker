// services/user.service.ts

import * as repo from "../repositories/user.repo";

export async function getUsers() {
  return repo.getUsers();
}

export async function getUserById(id: number) {
  const user = await repo.getUserById(id);

  if (!user) throw new Error("User not found");

  return user;
}

export async function deleteUser(id: number) {
  return repo.deleteUser(id);
}