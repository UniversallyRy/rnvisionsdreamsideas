import { ADD_TODO, EDIT_TODO, DELETE_TODO, TOGGLE_TODO, ADD_LIST } from "../actionTypes";
import { v4 as uuidv4 } from 'uuid';

const initialValue = [
  {
      name: 'Plan A Trip',
      id: uuidv4(),
      color: '#FE1F14', 
      todos: [
          {
              title: "Book Flight",
              completed: false,
              id: uuidv4(),
          },
          {
              title: "Passport Check",
              completed: false,
              id: uuidv4(),
          },
          {
              title: "Reserve Hotel",
              completed: true,
              id: uuidv4(),
          },
          {
              title: "Pack Luggage",
              completed: false,
              id: uuidv4(),
          },
      ]
  },
  {
      name: 'Errands',
      id: uuidv4(),
      color: '#000000', 
      todos: [
          {
              title: "Store",
              completed: true,
              id: uuidv4(),
          },
          {
              title: "Hike",
              completed: false,
              id: uuidv4(),
          },
          {
              title: "Take a video",
              completed: true,
              id: uuidv4(),
          },
          {
              title: "Walk Dog",
              completed: true,
              id: uuidv4(),
          },
      ]
  },
  {
      name: 'Party',
      id: uuidv4(),
      color: '#2E4045', 
      todos: [
          {
              title: "Ballons",
              completed: false,
              id: uuidv4(),
          },
          {
              title: "Make Dinner",
              completed: false,
              id: uuidv4(),
          },
          {
              title: "Send Invites",
              completed: true,
              id: uuidv4(),
          },
          
      ]
  },

];

export default function( state = initialValue, action ) {
  switch ( action.type ) {
    case ADD_TODO: 
       state = initialValue ; //can be used to quickly reset a reducers todo
      return state;
          // return [
          //   { 
          //   task: action.payload.task,
          //   id: uuidv4(),
          //   complete: false,
          //   },
          //   ...state.todos,
          // ];
    case ADD_LIST: 
          return [
            
            {
              name: action.payload.name,
              id: uuidv4(),
              color: action.payload.color, 
              todos: []
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
      return state.filter(( list ) => list.todos.id != action.payload.id);
    }
    default:
      return state;
  }
};