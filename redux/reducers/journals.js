import { ADD_JOURNAL, EDIT_JOURNAL, DELETE_JOURNAL } from "../actionTypes";
import { v4 as uuidv4 } from 'uuid';
import lorem from '../../shared/lorem';

const initialJournals = [
  {
    title: "Add Task 1",
    body: lorem,
    id: uuidv4(),
  },
  {
    title: "Add Task 2",
    body: lorem,
    id: uuidv4(),
  },
  {
    title: "Add Task 33",
    body: lorem,
    id: uuidv4(),
  }
]; 
export default function( state = initialJournals, action ) {
  switch ( action.type ) {
    case ADD_JOURNAL:
          return [
            { 
            title: action.payload.title,
            body: action.payload.body,
            id: uuidv4(),
            },
            ...state,
          ]
  
    case EDIT_JOURNAL: {
      return {
        ...state,
      };
    }
    case DELETE_JOURNAL: {
      return state.filter(todo => todo.id !== action.payload.id);
    }
    default:
      return state;
  }
}