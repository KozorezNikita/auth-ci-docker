import { GetTodosParams } from "@/hooks/useTodos";
import { TodoSchema } from "../types/todo.schema";
import { apiClient } from "./client";
import { TodoId, Todo, NewTodo } from "@/types/todo";

type PaginatedTodos = {
  data: Todo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export async function getTodos(
  params: GetTodosParams
): Promise<PaginatedTodos> {
  const res = await apiClient.get("/todos", { params });
  return res.data;
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
  /*await apiClient.put(`/todos/${id}`, data);
  return {
    id,
    title: data.title ?? "",
    completed: data.completed ?? false,
    userId: 0,
  };*/
}



export async function deleteTodo(id: number): Promise<void> {
  await apiClient.delete(`/todos/${id}`);
}


export async function deleteCompleted(): Promise<void> {
  await apiClient.delete("/todos/completed")
}