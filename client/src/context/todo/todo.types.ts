import { NewTodo, Todo, TodoId, UpdateTodo } from '../../types/todo';

export type State = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
};

export type Action = 
 | {type: "FETCH_START"}
 | {type: "FETCH_SUCCESS"; payload: Todo[]}
 | {type: "FETCH_ERROR"; payload: string}
 //| {type: "SET TODOS"; payload: Todo[]}
 | {type: "ADD"; payload: NewTodo}
 | {type: "DELETE"; payload: TodoId}
 | {type: "TOGGLE"; payload: TodoId}
 | {type: "EDIT"; payload: {id: TodoId, data: UpdateTodo}}
 | {type: "CLEAR_COMPLETED"}
 