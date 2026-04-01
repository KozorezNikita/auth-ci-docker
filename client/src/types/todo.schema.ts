import z from "zod";

export const TodoSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean()
});

export const AllTodosSchema = z.array(TodoSchema);


export const NewTodoSchema = z.object({
    title: z.string().min(1, "Title is required"),
    userId: z.number().min(1, "Must be > than 0")
});

export const UpdateTodoSchema = TodoSchema.partial();