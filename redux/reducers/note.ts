import uuid from "../../utils/uuid";
import { createSlice } from '@reduxjs/toolkit'

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
const notes = createSlice( {
  name:"notes",
  initialState: initialNotes,
  reducers: {
    addNote: (state, action) => {
      state.push({
        name: action.payload.name,
        id: uuid.generate(),
      })
    },
    editNote: (state, action) => {
      const newState = action.payload.draft;
      return newState;
    },
    deleteNote: (state, action) => {
      state.filter(item => item.id != action.payload.id);
    },
  }
})

const { actions, reducer } = notes;
export const { addNote, editNote, deleteNote} = actions;
export default reducer;