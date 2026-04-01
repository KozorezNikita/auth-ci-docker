import { pool } from '../db/pool';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export async function getTodos(): Promise<Todo[]> {
  const result = await pool.query('SELECT * FROM todos ORDER BY id DESC');
  return result.rows.map(mapTodo);
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