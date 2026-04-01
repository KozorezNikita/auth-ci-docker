import z from "zod"
import { NewTodoSchema, TodoSchema, UpdateTodoSchema } from "./todo.schema"

export type TodoId = number

export type Todo = z.infer<typeof TodoSchema>

export type NewTodo = z.infer<typeof NewTodoSchema>

export type UpdateTodo = z.infer<typeof UpdateTodoSchema>

export type TodoFormData = Pick<Todo,  "title" | "userId">

export type Filter = "all" | "completed" | "active"