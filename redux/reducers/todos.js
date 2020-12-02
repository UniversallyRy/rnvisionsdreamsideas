import { ADD_TODO, TOGGLE_TODO, DELETE_TODO} from "../actionTypes";

export default function( state = [], action ) {
  switch ( action.type ) {
    case ADD_TODO:
          return [
            { 
            task: action.payload.task,
            id: action.payload.id,
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