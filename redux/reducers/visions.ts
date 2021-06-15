import { ADD_VISION, EDIT_VISION, DELETE_VISION } from "../actionTypes";
import uuid from "../../utils/uuid";
import { createReducer } from '@reduxjs/toolkit'


const initialVisions = Array.from({ length: 8 }).map((_, i) => {
  return {
    uri: `https://picsum.photos/200${i}`,
    title: `This is the title ${i + 1}!`,
    id: uuid.generate(),
  };
});

const visions = createReducer(initialVisions, (builder) => {
    builder
    .addCase(ADD_VISION, (state, action) => {
      state.unshift({
          uri: action.payload.uri,
          title: action.payload.title,
          id: uuid.generate(),
      })
    })
    .addCase(EDIT_VISION, (state, action) => {
      return state;
    })
    .addCase(DELETE_VISION, (state, action) => {
      return state.filter((vision) => vision.id !== action.payload.id);
    })
})

export default visions;
