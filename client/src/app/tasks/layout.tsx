import { TodoProvider } from '@/context/todo/TodoProvider'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Tasks',
  description: 'Tasks page layout',
}

export default function TasksLayout({ children }: { children: ReactNode }) {
  return (
    <TodoProvider>
      <div style={{ border: '2px dashed #1F58D3', padding: '1rem' }}>
        <h2>Tasks Section</h2>
        {children}
      </div>
    </TodoProvider>
  )
}