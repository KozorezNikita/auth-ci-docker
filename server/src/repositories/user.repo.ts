import { prisma } from "../db/prisma";

export type User = {
  id: number;
  name: string;
};

export type NewUser = {
  name: string;
};



export async function createUser(name: string) {
  return prisma.user.create({
    data: { name },
  });
}

export async function getUsers() {
  return prisma.user.findMany();
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
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