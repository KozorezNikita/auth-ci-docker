import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo_app',
  password: 'lacazette10!', 
  port: 5432,
});