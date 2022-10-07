import { createSlice } from '@reduxjs/toolkit';

const initialState = "";

const picturePicker = createSlice({
  name:"New Pic",
  initialState,
  reducers: {
    addPic: (state, action): void => {
      return state === action.payload.uri ? "" : action.payload.uri;
    }
  }
});

const { actions, reducer } = picturePicker;

export const { addPic } = actions;
export default reducer;
