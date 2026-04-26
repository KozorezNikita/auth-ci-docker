import { prisma } from "../db/prisma";

export type User = {
  id: number;
  name: string;
};

export type NewUser = {
  name: string;
};

export async function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true
    }
  });
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true
    }
  });
}

export async function getUserWithTodos(id: number) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      todos: true,
    },
  });
}

export async function deleteUser(id: number) {
  return prisma.user.delete({
    where: { id },
  });
}