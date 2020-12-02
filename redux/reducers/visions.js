import { ADD_VISION, TOGGLE_VISION, DELETE_VISION} from "../actionTypes";
import { v4 as uuidv4 } from 'uuid';

const initialVisions = [
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
export default function( state = initialVisions, action ) {
  switch ( action.type ) {
    case ADD_VISION:
          return [
            { 
            task:action.payload.task,
            id: uuidv4(),
            complete: false
            },
            ...state,
          ]
    case TOGGLE_VISION: {
      return {
        ...state,
        todo_list: state.todo_list.filter(
          ( todo ) => todo.id !=payload.id
        )
      };
    }
    case DELETE_VISION: {
      return state.filter(( todo ) => todo.id != action.payload.id)
    };
    default:
      return state;
  }
}