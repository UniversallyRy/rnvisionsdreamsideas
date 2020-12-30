import { ADD_TODO, EDIT_TODO, DELETE_TODO, TOGGLE_TODO, ADD_LIST } from "../actionTypes";
import { v4 as uuidv4 } from 'uuid';
import produce from 'immer';

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
    produce( state, draft => {
      switch ( action.type ) {
        case ADD_TODO: 
          //state = initialValue ; //can be used to quickly reset
          //return state;
          
          return draft.map(( item, i = 0) => {
                let newItem =  item.todos[i];

                if( newItem.id === action.payload.id ) {
                    let newerItem = {
                      title: action.payload.title,
                      id: uuidv4(),
                      completed: false
                    };               
                    return newerItem;
                }

                i++;
                return newItem;
          });
        case ADD_LIST: 
              return [
                {
                  name: action.payload.name,
                  id: uuidv4(),
                  color: action.payload.color, 
                  todos: []
                },
                ...draft
              ];
              
        case EDIT_TODO: {
          const newState= action.payload.draft;
          return newState;
        }
        case TOGGLE_TODO: {
        const { payload } = action;
        let { items } = draft;
        
        return draft; 
        }
          // return { todos, ...draft }
        case DELETE_TODO: {
          return draft.filter(( list ) => list.todos.id != action.payload.id);
        }
        default:
          return state;
    }
  });
  return state;
}