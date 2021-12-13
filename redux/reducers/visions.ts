import uuid from "../../utils/uuid";
import { createSlice } from '@reduxjs/toolkit'


const initialVisions = Array.from({ length: 8 }).map((_, i) => {
  return {
    uri: `https://picsum.photos/200${i}`,
    title: `This is the title ${i + 1}!`,
    id: uuid.generate(),
  };
});

const visions = createSlice({
    name: "Visions",
    initialState: initialVisions,
    reducers:{
      addVision: (state, action) => {
      state.unshift({
          uri: action.payload.uri,
          title: action.payload.title,
          id: uuid.generate(),
      })
    },
    editVision: (state, action) => {
      return state;
    },
    deleteVision: (state, action) => {
      return state.filter((vision) => vision.id !== action.payload.id);
    }
  }
})

const { actions, reducer } = visions;
export const { addVision, deleteVision, editVision} = actions;
export default reducer;