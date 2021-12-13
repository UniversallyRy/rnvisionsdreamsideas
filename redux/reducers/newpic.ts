import { createSlice } from '@reduxjs/toolkit'

const initialState = "";

const newpic = createSlice({
  name:"New Pic",
  initialState,
  reducers: {
    addPic: (state, action) => {
      var uri = "";
      var newUri = uri == action.payload.uri ? "" : action.payload.uri;
      return newUri;
    }
  }
});

const { actions, reducer } = newpic
export const { addPic } = actions;
export default reducer