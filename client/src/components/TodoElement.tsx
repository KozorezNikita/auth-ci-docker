import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/todo';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo, deleteTodo } from '@/API/todo';

type Props = {
  todo: Todo;
};

const TodoElement = ({ todo }: Props) => {
  console.log("render", todo.id);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  

  // 🔹 фокус при редагуванні
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // 🔹 DELETE
  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: deleteTodo,

    onSuccess: (_, id) => {
      queryClient.setQueryData(['todos'], (old: Todo[] = []) =>
        old.filter(todo => todo.id !== id)
      );
    },
  });

  // 🔹 TOGGLE
  const toggleMutation = useMutation<Todo, Error, number>({
    mutationFn: (id) =>
      updateTodo({
        id,
        data: { completed: !todo.completed },
      }),

    onSuccess: (updatedTodo) => {
      queryClient.setQueryData(['todos'], (old: Todo[] = []) =>
        old.map(t =>
          t.id === updatedTodo.id ? updatedTodo : t
        )
      );
    },
  });

  // 🔹 EDIT
  const editMutation = useMutation<
    Todo,
    Error,
    { id: number; data: Partial<Todo> }
  >({
    mutationFn: updateTodo,

    onSuccess: (updatedTodo) => {
      queryClient.setQueryData(['todos'], (old: Todo[] = []) =>
        old.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    },
  });

  const handleSave = () => {
    if (!value.trim()) return;

    editMutation.mutate({
      id: todo.id,
      data: { title: value },
    });

    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }

    if (e.key === "Escape") {
      setValue(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleMutation.mutate(todo.id)}
      />

      {isEditing ? (
        <>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <Link href={`/tasks/${todo.id}`}>
            <span style={{ cursor: "pointer" }}>
              {todo.title}
            </span>
          </Link>
          <button onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </>
      )}

      <button onClick={() => deleteMutation.mutate(todo.id)}>
        Delete
      </button>
    </>
  );
};

export default React.memo(TodoElement);



/*

const toggleMutation = useMutation({
      mutationFn: async (id: number) => {
        // фейковий toggle
        return id
      },

      onSuccess: (id) => {
        queryClient.setQueryData(['todos'], (old: Todo[] = []) =>
          old.map(todo =>
            todo.id === id
              ? { ...todo, completed: !todo.completed }
              : todo
          )
        )
      },
    })

    const editMutation = useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: number
        data: Partial<Todo>
      }) => {
        // фейк (як і раніше)
        return { id, data }
      },

      onSuccess: ({ id, data }) => {
        queryClient.setQueryData(['todos'], (old: Todo[] = []) =>
          old.map(todo =>
            todo.id === id
              ? { ...todo, ...data }
              : todo
          )
        )
      },
    })


*/ 