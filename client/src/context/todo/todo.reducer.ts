import { Todo } from "../../types/todo";
import { Action, State } from "./todo.types";


export const initialState: State = {
      todos: [],
      loading: false,
      error: null
    };


export function todoReducer (state: State, action: Action): State {
    switch (action.type) {

      case "FETCH_START":
        return {
          ...state,
          loading: true,
          error: null
        }

      case "FETCH_SUCCESS":
        return {
          ...state, 
          loading: false,
          todos: action.payload
        }

      case "FETCH_ERROR":
        return {
          ...state, 
          loading: false,
          error: action.payload
        }

      case "ADD": {
          const newId = state.todos.length ? state.todos[state.todos.length - 1].id + 1 : 1;
          const newTodo: Todo = {
            id: newId,
            userId: action.payload.userId,
            title: action.payload.title,
            completed: false
          };
          return {...state, todos: [...state.todos, newTodo]}
      }

      case "DELETE":
        return {
          ...state, todos: state.todos.filter(todo => todo.id !== action.payload)
        }
        

      case "TOGGLE": 
        return {
          ...state,
           todos: state.todos.map(todo =>
             todo.id === action.payload ?
              {...todo, completed: !todo.completed} : todo)
        }
      
      case "EDIT": 
        return {
          ...state,
           todos: state.todos.map(todo =>
             todo.id === action.payload.id ?
              {...todo, ...action.payload.data} : todo)
        }
      
      case "CLEAR_COMPLETED": 
        return {...state, todos: state.todos.filter(todo => !todo.completed)}

      default: {
        const _exhaustiveCheck : never = action;
        return state;
      }
    }
  }