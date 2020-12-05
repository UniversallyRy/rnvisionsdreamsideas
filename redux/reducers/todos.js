import { ADD_TODO, EDIT_TODO, DELETE_TODO, TOGGLE_TODO } from "../actionTypes";
import { v4 as uuidv4 } from 'uuid';

const initialValue = [];

export default function( state = initialValue, action ) {
  switch ( action.type ) {
    case ADD_TODO: 
        //can be used to quickly reset a reducers todo
      // return intiialstate 
          return [
            { 
            task: action.payload.task,
            id: uuidv4(),
            complete: false
            },
            ...state,
          ];
    case EDIT_TODO: {
      const { payload } = action;
      return (
        state.map(item => {
          if (item.id === payload.id) {
            return {
              ...item,
              task:payload.task,
              complete: !complete
            };
          }
        })
      );
    }
    case TOGGLE_TODO: 
    const { payload } = action;
    let { items } = state;
    let index = items.indexOf(payload.todo);
    let toggledTodo = Object.assign({}, items[index]);
    toggledTodo.complete = !toggledTodo.complete;
    return {
      ...state,
      items: {
        ...items.slice(0, index),
        toggledTodo,
        ...items.slice(index + 1),
      },
    };
      // return { todos, ...state }
    case DELETE_TODO: {
      return state.filter(( todo ) => todo.id != action.payload.id);
    }
    case "ADD_TEXT": {
      return {...state, task: action.payload.value};
    }
    default:
      return state;
  }
}