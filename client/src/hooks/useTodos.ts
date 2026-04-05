import { getTodos } from "@/API/todo";
import { keepPreviousData, useQuery } from "@tanstack/react-query";


export type GetTodosParams = {
  page?: number;
  limit?: number;
  completed?: boolean;
  search?: string;
};

export function useTodos(params: GetTodosParams) {
  return useQuery({
    queryKey: ["todos", params.page, params.limit, params.completed, params.search],
    queryFn: () => getTodos(params),

    placeholderData: keepPreviousData // 🔥 дуже важливо для pagination
  });
}