import { deleteCompleted } from "@/API/todo"
import { Action } from "@/context/todo/todo.types"
import { Filter, Todo } from "@/types/todo"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"


type Props = {
    updateParams: (params: Record<string, string>) => void,
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>

}

export const TodoFilter = ({updateParams, search, setSearch}: Props) => {
  const queryClient = useQueryClient()

  const clearCompletedMutation = useMutation({
    mutationFn: deleteCompleted,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  })

  return (
    <>
      <input type="text" value={search} onChange={(e) => {setSearch(e.target.value); updateParams({search: e.target.value, page: "1"})}}/>
      <button onClick={() => updateParams({completed: ""})}>All</button>
      <button onClick={() => updateParams({completed: "false"})}>Active</button>
      <button onClick={() => updateParams({completed: "true"})}>Completed</button>
      <button onClick={() => clearCompletedMutation.mutate()}>Clear completed</button>
    </>
  )
}


