'use client'

import { getTodos } from '@/API/todo';
import List from '@/components/List';
import { Pagination } from '@/components/Pagination';
import { TodoAdd } from '@/components/TodoAdd';
import TodoElement from '@/components/TodoElement';
import { TodoFilter } from '@/components/TodoFilter';
import { selectFilteredTodos } from '@/context/todo/todo.selectors';
import { useDebounce } from '@/hooks/useDebounce';
import { useTodos } from '@/hooks/useTodos';
import { Filter, NewTodo, Todo } from '@/types/todo';
import { NewTodoSchema } from '@/types/todo.schema';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useMemo, useCallback} from 'react';


function TodoPage() {
  //const [todos, setTodos] = useState<Todo[]>([]);
  //const [todos, dispatch] = useReducer(todoReducer, [])
  //const {todos, loading, error, dispatch} = useTodos();
  //const [page, setPage] = useState(1)
  //const [filter, setFilter] = useState<Filter>("all")
  const searchParams = useSearchParams();
  const router = useRouter();


  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 500)

  const page = Number(searchParams.get("page") || 1)
  const completedParam = searchParams.get("completed");
  const completed =
    completedParam === "true"
      ? true
      : completedParam === "false"
      ? false
      : undefined;

  const {data, isLoading, error,} = useTodos({page, limit: 10, completed, search: debouncedSearch })
  const todos = data?.data ?? [];
  const totalPages = Number(data?.totalPages)
  

  const updateParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    router.push(`?${newParams.toString()}`);
};



  
  
  

  
  /*const filteredTodos = useMemo(
    () => selectFilteredTodos(todos, filter),
    [todos, filter]
  )  */
  
  const renderTodo = useCallback(
    (todo: Todo) => <TodoElement todo={todo} />,
    []
  )

  /*const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);*/

  

  



  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>{error.message}</p>;

    return (
      <div className="App">
      <TodoFilter updateParams={updateParams} search={search} setSearch={setSearch}/>
      <TodoAdd />
      <List
        items={todos}
        keyExtractor={(todo) => todo.id}
        renderItem={renderTodo}
      />
      <Pagination totalPages={totalPages} page={page} updateParams={updateParams} />
      </div>
    );
  }

export default TodoPage
