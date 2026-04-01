import { Todo } from "../../types/todo";

export const selectTodos = (todos: Todo[]) => todos;


export const selectFilteredTodos = (todos: Todo[], filter: string) => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};