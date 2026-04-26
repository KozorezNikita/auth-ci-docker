import { Prisma } from '@prisma/client';
import { prisma } from '../db/prisma';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type GetTodosOptions = {
  page?: number;
  limit?: number;
  completed?: boolean;
  search?: string;
  userId?: number;
};






export async function getTodos(options: GetTodosOptions) {
  const {
    page = 1,
    limit = 10,
    completed,
    search,
    userId
  } = options;

  const skip = (page - 1) * limit;

  const where = {
    userId,
    ...(completed !== undefined && { completed }),
    ...(search && {
      title: {
        contains: search,
        mode: Prisma.QueryMode.insensitive,
      },
    }),
  };

  const [todos, total] = await prisma.$transaction([
    prisma.todo.findMany({
      where,
      include: { user: true },
      take: limit,
      skip,
      orderBy: { id: "desc" },
    }),
    prisma.todo.count({ where }),
  ]);

  return {
    data: todos,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}






/*
export async function getTodos() : Promise<Todo[]>{
  return prisma.todo.findMany({include: {user: true}});
}
*/



export async function getTodoById(id: number) {
  return prisma.todo.findUnique({
    where: { id },
  });
}

export async function createTodo(title: string, userId: number) {
  return prisma.todo.create({
    data: {
      title,
      userId,
    },
  });
}

export async function updateTodo(id: number, userId: number, data: any) {
  await prisma.todo.updateMany({
    where: { id, userId },
    data,
  });

  return prisma.todo.findUnique({
    where: { id },
  });
}

export async function deleteTodo(id: number, userId: number) {
  return prisma.todo.deleteMany({
    where: { id, userId },
  });
}

export async function deleteCompleted(userId: number) {
  return prisma.todo.deleteMany({
    where: {
      completed: true,
      userId,
    },
  });
}



/*
export async function getTodos(userId?: number): Promise<Todo[]> {
  if (userId) {
    const result = await pool.query(
      'SELECT * FROM todos WHERE user_id = $1 ORDER BY id DESC',
      [userId]
    );

    return result.rows.map(mapTodo);
  }

  const result = await pool.query(
    'SELECT * FROM todos ORDER BY id DESC'
  );

  return result.rows.map(mapTodo);
}



export async function getTodos(userId?: number) {
  return prisma.todo.findMany({
    where: userId ? { userId } : undefined,
    orderBy: { id: 'desc' },
  });
}











export async function getTodoById(id: number): Promise<Todo | null> {
  const result = await pool.query(
    'SELECT * FROM todos WHERE id = $1',
    [id]
  );

  return result.rows[0] ? mapTodo(result.rows[0]) : null;
}

export async function createTodo(title: string, userId: number): Promise<Todo> {
  const result = await pool.query(
    'INSERT INTO todos (title, user_id) VALUES ($1, $2) RETURNING *',
    [title, userId]
  );
  return mapTodo(result.rows[0]);
}

export async function updateTodo(
  id: number,
  data: Partial<Pick<Todo, 'title' | 'completed' | 'userId'>>
): Promise<Todo> {
  const fields: string[] = [];
  const values: any[] = [];

  let i = 1;

  const dbFieldsMap: Record<string, string> = {
    title: 'title',
    completed: 'completed',
    userId: 'user_id',
  };

  for (const key in data) {
    const dbField = dbFieldsMap[key];
    if (!dbField) continue;

    fields.push(`${dbField} = $${i}`);
    values.push((data as any)[key]);
    i++;
  }

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  values.push(id);

  const result = await pool.query(
    `UPDATE todos SET ${fields.join(', ')} WHERE id = $${i} RETURNING *`,
    values
  );

  return mapTodo(result.rows[0]);
}

export async function deleteTodo(id: number): Promise<void> {
  await pool.query('DELETE FROM todos WHERE id = $1', [id]);
}


function mapTodo(row: any) {
  return {
    id: row.id,
    title: row.title,
    completed: row.completed,
    userId: row.user_id, // 🔥 головне
  };
}

*/ 