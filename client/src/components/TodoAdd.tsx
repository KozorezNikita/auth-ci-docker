import { createTodo } from "@/API/todo";
import { NewTodo, Todo } from "@/types/todo";
import { NewTodoSchema } from "@/types/todo.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";



export const TodoAdd = () => {
  
  const [inputValue, setInputValue] = useState<string>("");

  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  function handleAdd() {
    const result = NewTodoSchema.safeParse({
      title: inputValue
    });

    if (!result.success) {
      console.log(result.error.message);
      return;
    }

    createMutation.mutate(result.data);

    setInputValue("");
}

  
  


  return (
    <>
        <input
            value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.target.value)
            }
        />
        <button onClick={handleAdd}>Add a todo</button>
    </>
  )
}







/*

const addTodoMutation = useMutation({
    mutationFn: async (newTodo: NewTodo) => {
      // поки що фейк (JSONPlaceholder не зберігає реально)
      return {
        id: Date.now(),
        ...newTodo,
        completed: false,
      }
    },

    onSuccess: (newTodo) => {
      queryClient.setQueryData(['todos'], (old: Todo[] = []) => [
        ...old,
        newTodo,
      ])
    },
  })

  


  
  function handleAdd() {
    const result = NewTodoSchema.safeParse({
      title: inputValue,
      userId: userValue,
    });

    if (!result.success) {
      console.log(result.error.message)
    }

    if (!result.success) return;
    addTodoMutation.mutate(result.data)

    

    setInputValue("");
    setUserValue(0);
  }

*/ 