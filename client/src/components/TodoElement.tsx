import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/todo';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo, deleteTodo } from '@/API/todo';

type Props = {
  todo: Todo;
};

const TodoElement = ({ todo }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  // ⚠️ той самий ключ, що в useTodos
  const queryKey = ['todos'];

  // 🔹 DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  // 🔹 TOGGLE
  const toggleMutation = useMutation({
    mutationFn: (id: number) =>
      updateTodo({
        id,
        data: { completed: !todo.completed },
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  // 🔹 EDIT
  const editMutation = useMutation({
    mutationFn: updateTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') {
                setValue(todo.title);
                setIsEditing(false);
              }
            }}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <Link href={`/tasks/${todo.id}`}>
            <span style={{ cursor: 'pointer' }}>
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