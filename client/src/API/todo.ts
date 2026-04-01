import { AllTodosSchema, TodoSchema } from "../types/todo.schema";
import { apiClient } from "./client";
import { TodoId, Todo, NewTodo } from "@/types/todo";

// 🔹 GET ALL
export async function getTodos(): Promise<Todo[]> {
  const response = await apiClient.get(`/todos`);

  const result = AllTodosSchema.safeParse(response.data);

  if (!result.success) {
    console.error(result.error);
    throw new Error("Invalid API response");
  }

  return result.data;
}

// 🔹 GET ONE
export async function getOneTodo(id: TodoId): Promise<Todo> {
  const response = await apiClient.get(`/todos/${id}`);

  const result = TodoSchema.safeParse(response.data);

  if (!result.success) {
    console.error(result.error);
    throw new Error("Invalid API response");
  }

  return result.data;
}


export async function createTodo(data: NewTodo): Promise<Todo> {
  const response = await apiClient.post(`/todos`, data);

  const result = TodoSchema.safeParse(response.data);

  if (!result.success) {
    console.error(result.error);
    throw new Error("Invalid API response");
  }

  return result.data;
}




export async function updateTodo({ id, data,} : { id: number; data: Partial<Todo>; }): Promise<Todo> {
  const response = await apiClient.put(`/todos/${id}`, data);

  const result = TodoSchema.safeParse(response.data);

  if (!result.success) {
    console.error(result.error);
    throw new Error("Invalid API response");
  }

  return result.data;
}



export async function deleteTodo(id: number): Promise<void> {
  await apiClient.delete(`/todos/${id}`);
}