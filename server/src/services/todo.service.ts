// services/todo.service.ts

import * as repo from "../repositories/todo.repo";

type GetTodosInput = {
  userId: number;
  page?: number;
  limit?: number;
  completed?: boolean;
  search?: string;
};

export async function getTodos(input: GetTodosInput) {
  return repo.getTodos(input);
}

export async function getTodoById(id: number, userId: number) {
  const todo = await repo.getTodoById(id);

  if (!todo || todo.userId !== userId) {
    throw new Error("Todo not found");
  }

  return todo;
}

export async function createTodo(title: string, userId: number) {
  if (!title.trim()) {
    throw new Error("Title is required");
  }

  return repo.createTodo(title, userId);
}

export async function updateTodo(id: number, userId: number, data: any) {
  return repo.updateTodo(id, userId, data);
}

export async function deleteTodo(id: number, userId: number) {
  const result = await repo.deleteTodo(id, userId);

  if (result.count === 0) {
    throw new Error("Todo not found or not yours");
  }
}

export async function deleteCompleted(userId: number) {
  return repo.deleteCompleted(userId); // ⚠️ тут ще можна покращити
}