import uuid from "../../utils/uuid";
import { createSlice } from '@reduxjs/toolkit';

export type Ideas = {
  name: string;
  id: string;
}

const initialIdeas: Ideas[] = [
  {
    name: "idea 1",
    id: uuid.generate(),
  },
  {
    name: "idea 2",
    id: uuid.generate(),
  },
];

const ideas = createSlice( {
  name:"ideas",
  initialState: initialIdeas,
  reducers: {
    addIdea: (state, action) => {
      state.push({
        name: action.payload.name,
        id: uuid.generate(),
      })
    },
    editIdea: (state, action) => {
      const newState = action.payload.draft;
      return newState;
    },
    deleteIdea: (state, action) => {
      return state.filter((note) => note.id != action.payload.id);
    },
  }
});

const { actions, reducer } = ideas;
export const { addIdea, editIdea, deleteIdea } = actions;
export default reducer;