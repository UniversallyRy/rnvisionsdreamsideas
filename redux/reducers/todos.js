import { ADD_TODO, TOGGLE_TODO } from "../actionTypes";
import { v4 as uuidv4 } from 'uuid';

const initialTodos = [
  {
    id: uuidv4(),
    task: "Add Task 1",
    complete: false
  },
  {
    id: uuidv4(),
    task: "Add Task 2",
    complete: false
  }
]; 
export default function(state = initialTodos, action) {
  switch (action.type) {
    case ADD_TODO:
          return state.map(todo => {
            if (todo.id === action.id) {
              return { ...todo, complete: false };
            } else {
              return todo;
            }
          });
    case TOGGLE_TODO: {
      return {
        ...state,
        todo_list: state.todo_list.filter(
          (todo) => todo.id !=payload.id
        )
      };
    }
    default:
      return state;
  }
}
