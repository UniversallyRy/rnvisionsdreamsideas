import { ADD_TODO, EDIT_TODO, DELETE_TODO, TOGGLE_TODO } from "../actionTypes";
import { v4 as uuidv4 } from 'uuid';
import { editTodo } from "../actions";

const initialValue = [];

export default function( state = initialValue, action ) {
  switch ( action.type ) {
    case ADD_TODO: 
      // state = [] ; //can be used to quickly reset a reducers todo
      // return state 
          return [
            { 
            task: action.payload.task,
            id: uuidv4(),
            complete: false
            },
            ...state,
          ];
    case EDIT_TODO: {
      const newState= action.payload.state;
      return newState;
    }
    case TOGGLE_TODO: {
    const { payload } = action;
    let { items } = state;
    
    return state; 
    }
      // return { todos, ...state }
    case DELETE_TODO: {
      return state.filter(( todo ) => todo.id != action.payload.id);
    }
    default:
      return state;
  }
}