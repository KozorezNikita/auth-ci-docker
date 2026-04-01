import { Action } from "@/context/todo/todo.types"
import { useTodos } from "@/context/todo/useTodos"
import { Filter, Todo } from "@/types/todo"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"


type Props = {
    setFilter: (filter: Filter) => void
}

export const TodoFilter = ({setFilter}: Props) => {
  const queryClient = useQueryClient()

  const clearCompletedMutation = useMutation({
    mutationFn: async () =>  true,

    onSuccess: () => {
      queryClient.setQueryData(["todos"], (old: Todo[] = []) =>
        old.filter(todo => !todo.completed)
      )
    },
  })

  return (
    <>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => clearCompletedMutation.mutate()}>Clear completed</button>
    </>
  )
}


