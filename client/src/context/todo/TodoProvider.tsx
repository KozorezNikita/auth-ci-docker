'use client'

import { createContext, useContext, useReducer, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Todo } from "../../types/todo";
import { initialState, todoReducer } from "./todo.reducer";
import { Action } from "./todo.types";
import { getTodos } from "@/API/todo";



type ContextType = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  dispatch: React.Dispatch<Action>;
};

export const TodoContext = createContext<ContextType | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [storedTodos, setStoredTodos] = useLocalStorage<Todo[]>("todos", []);

  const [state, dispatch] = useReducer(todoReducer, {
    ...initialState,
    todos: storedTodos
  });

  // 🔥 fetch ТІЛЬКИ якщо localStorage пустий
  useEffect(() => {
    if (storedTodos.length === 0) {
      fetchTodos();
    }
  }, []);

  async function fetchTodos() {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await getTodos();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch({ type: "FETCH_ERROR", payload: e.message});
      } else {
        dispatch({ type: "FETCH_ERROR", payload: "failed to fetch todos" });
      }
    } 
  }

  // 🔥 синхронізація reducer → localStorage
  useEffect(() => {
    setStoredTodos(state.todos);
  }, [state.todos]);

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};