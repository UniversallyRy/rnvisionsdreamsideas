import { ADD_PIC } from "../actionTypes";

const initialPic = 'test';

export default function( state = initialPic, action ) {
  switch ( action.type ) {
    case ADD_PIC:
        var uri = '';
        var newUri = ( uri == action.payload.uri ) ? '' : action.payload.uri;
        
        return newUri;
    default:
      return state;
  }
}