import { ADD_TODO, DELETE_TODO } from "../actionTypes";

const initialState = [
    { item: 'Learn about reducers', completed: false, id: 1 },
    { item: 'review material from last week', completed: false, id: 2 },
    { item: 'complete reducer todo project', completed: false, id: 3 }
]
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return [
        ...state,
          {
            item: action.payload,
            completed: false, 
            id: Date.now()
          }
        ];
    }
    case DELETE_TODO: {
      return state.filter( item => !item.completed)
    }
    default:
      return state;
  }
}
