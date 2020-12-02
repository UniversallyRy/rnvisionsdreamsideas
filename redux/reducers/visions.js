import { ADD_VISION, TOGGLE_VISION, DELETE_VISION} from "../actionTypes";
import { v4 as uuidv4 } from 'uuid';

const initialVisions = Array.from({ length:8 }).map((_, i) => {
    return {
      uri: `https://picsum.photos/200${ i }`,
      title: `This is the title ${ i + 1 }!`,
      id: uuidv4(),
    };
  });

export default function( state = initialVisions, action ) {
  switch ( action.type ) {
    case ADD_VISION:
          return [
            { 
            uri: action.payload.uri,
            title: action.payload.title,
            id: uuidv4(),
            },
            ...state,
          ]
    case TOGGLE_VISION: {
      return {
        ...state
      };
    }
    case DELETE_VISION: {
      return state.filter(vision => vision.id !== action.payload.id)
    };
    default:
      return state;
  }
}