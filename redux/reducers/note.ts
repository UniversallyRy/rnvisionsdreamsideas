import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from "../actionTypes";
import uuid from "../../utils/uuid";
import { createReducer } from '@reduxjs/toolkit'

const initialNotes = [
  {
    name: "This is a default note",
    id: uuid.generate(),
  },
  {
    name: "This is a 2nd note",
    id: uuid.generate(),
  },
];
const notes = createReducer(initialNotes, (builder) => {
  builder
  .addCase(ADD_NOTE, (state, action) => {
    state.push({
      name: action.payload.name,
      id: uuid.generate(),
    })
  })
  .addCase(EDIT_NOTE, (state, action) => {
    const newState = action.payload.draft;
      return newState;
  })
  .addCase(DELETE_NOTE, (state, action) => {
    return state.filter((todo) => todo.id != action.payload.id);
  })
})

export default notes;