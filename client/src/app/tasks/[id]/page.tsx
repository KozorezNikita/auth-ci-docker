'use client'

import { getOneTodo } from '@/API/todo'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function TodoDetail() {
  const params = useParams()
  const id = Number(params.id)
  
  const {data: todo, isLoading, error} = useQuery({
    queryKey: ["todo", id],
    queryFn: () => getOneTodo(id)
  })

  if (isLoading) return <p>Todo not found</p>
  if (error) return <p>Error fetching todo</p>
  if (!todo) return <p>Todo not found</p>

  return (
    <div>
      <h2>Todo #{todo.id}</h2>
      <p>{todo.title}</p>
      <p>{todo.completed ? '✅ Completed' : '❌ Active'}</p>
    </div>
  )
}


/*
'use client'

import { getOneTodo } from '@/API/todo'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function TodoDetail() {
  const params = useParams()
  const id = params?.id ? Number(params.id) : null

  const { data: todo, isLoading, error } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => getOneTodo(id!),
    enabled: !!id,
  })

  if (isLoading) return <p>Loading...</p>
  if (error instanceof Error) return <p>{error.message}</p>
  if (!todo) return <p>Todo not found</p>

  return (
    <div>
      <h2>Todo #{todo.id}</h2>
      <p>{todo.title}</p>
      <p>{todo.completed ? '✅ Completed' : '❌ Active'}</p>
    </div>
  )
}
  */ 