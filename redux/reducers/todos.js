import { ADD_TODO, TOGGLE_TODO } from "../actionTypes";
import { v4 as uuidv4 } from 'uuid';

const initialTodos = [
  {
    task: "Add Task 1",
    id: uuidv4(),
    complete: false
  },
  {
    task: "Add Task 2",
    id: uuidv4(),
    complete: false
  }
]; 
export default function( state = initialTodos, action ) {
  switch ( action.type ) {
    case ADD_TODO:
          return [
            { 
            task:action.payload.task,
            id: uuidv4(),
            complete: false
            },
            ...state,
          ]
  
    case TOGGLE_TODO: {
      return {
        ...state,
        todo_list: state.todo_list.filter(
          ( todo ) => todo.id !=payload.id
        )
      };
    }
    default:
      return state;
  }
}