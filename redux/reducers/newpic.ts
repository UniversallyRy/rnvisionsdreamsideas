import { createReducer } from '@reduxjs/toolkit'
import { ADD_PIC } from "../actionTypes";

const initialPic = "";

const newpic = createReducer(initialPic, (builder) => {
  builder
  .addCase(ADD_PIC, (state, action) => {
    var uri = "";
    var newUri = uri == action.payload.uri ? "" : action.payload.uri;

    return newUri;
  })
});

export default newpic;