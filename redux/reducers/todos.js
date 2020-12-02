import { ADD_TODO, TOGGLE_TODO, DELETE_TODO} from "../actionTypes";
import { v4 as uuidv4 } from 'uuid';

export default function( state = [], action ) {
  switch ( action.type ) {
    case ADD_TODO:
          return [
            { 
            task: action.payload.task,
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
    case DELETE_TODO: {
      return state.filter(( todo ) => todo.id != action.payload.id)
    };
    default:
      return state;
  }
}