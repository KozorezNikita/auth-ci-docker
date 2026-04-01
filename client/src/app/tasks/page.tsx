'use client'

import { getTodos } from '@/API/todo';
import List from '@/components/List';
import { TodoAdd } from '@/components/TodoAdd';
import TodoElement from '@/components/TodoElement';
import { TodoFilter } from '@/components/TodoFilter';
import { selectFilteredTodos } from '@/context/todo/todo.selectors';
import { useTodos } from '@/context/todo/useTodos';
import { Filter, NewTodo, Todo } from '@/types/todo';
import { NewTodoSchema } from '@/types/todo.schema';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect, useMemo, useCallback} from 'react';


function TodoPage() {
  //const [todos, setTodos] = useState<Todo[]>([]);
  //const [todos, dispatch] = useReducer(todoReducer, [])
  //const {todos, loading, error, dispatch} = useTodos();
  const [filter, setFilter] = useState<Filter>("all")
  const {data: todos = [], isLoading, error} = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos
  })
  
  const filteredTodos = useMemo(
    () => selectFilteredTodos(todos, filter),
    [todos, filter]
  )  
  
  const renderTodo = useCallback(
    (todo: Todo) => <TodoElement todo={todo} />,
    []
  )

  

  



  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>{error.message}</p>;

    return (
      <div className="App">
      <TodoFilter setFilter={setFilter} />
      <TodoAdd />
      <List
        items={filteredTodos}
        keyExtractor={(todo) => todo.id}
        renderItem={renderTodo}
      />
      </div>
    );
  }

export default TodoPage
