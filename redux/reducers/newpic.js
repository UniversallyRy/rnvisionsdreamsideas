import { ADD_PIC } from "../actionTypes";

const initialPic = 'test';

export default function( state = initialPic, action ) {
  switch ( action.type ) {
    case ADD_PIC:
        var uri = '';
          return uri = action.payload.uri

    default:
      return state;
  }
}