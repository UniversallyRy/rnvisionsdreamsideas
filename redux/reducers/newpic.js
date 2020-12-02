import { ADD_PIC } from "../actionTypes";

const initialPic = 'test';

export default function( state = initialPic, action ) {
  switch ( action.type ) {
    case ADD_PIC:
        var uri = '';
        if(uri == action.payload.uri){
            return uri = '';
        }else{
          return uri = action.payload.uri
        }
    default:
      return state;
  }
}