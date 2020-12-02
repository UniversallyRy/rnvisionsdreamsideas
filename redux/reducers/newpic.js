import { ADD_PIC } from "../actionTypes";

const initialPic = '';

export default function( state = initialPic, action ) {
  switch ( action.type ) {
    case ADD_PIC:
          return [
            { 
            uri: action.payload.uri
            },
            ...state,
          ]
    default:
      return state;
  }
}