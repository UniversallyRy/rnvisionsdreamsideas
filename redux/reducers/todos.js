import { ADD_TODO, EDIT_TODO, DELETE_TODO} from "../actionTypes";
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
    case EDIT_TODO: {
      const { payload } = action;
      return {
        ...state,
        todoList: state.todoList.map(item => {
          if (item.id === payload.id) {
            return {
              ...item,
              task:payload.task,
              complete: payload.complete
            }
          }
        })
      }
    }
    case DELETE_TODO: {
      return state.filter(( todo ) => todo.id != action.payload.id)
    }
    case "ADD_TEXT": {
      return {...state, task: action.payload.value}
    }
    default:
      return state;
  }
}