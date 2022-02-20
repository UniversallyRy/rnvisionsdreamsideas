import { createSlice } from '@reduxjs/toolkit';
import uuid from "../../utils/uuid";

export type Idea = {
  inputValue: string;
  inputId: string;
}

const initialIdeas: Idea[] = [
  {
    inputValue: "idea 1",
    inputId: uuid.generate(),
  },
  {
    inputValue: "idea 2",
    inputId: uuid.generate(),
  },
];

const ideas = createSlice( {
  name:"ideas",
  initialState: initialIdeas,
  reducers: {
    addIdea: (state, action) => {
      state.push({
        inputValue: action.payload.inputValue,
        inputId: uuid.generate(),
      })
    },
    editIdea: (state, action) => {
      const newState = action.payload.draft;
      return newState;
    },
    deleteIdea: (state, action) => {
      return state.filter((idea) => idea.inputId != action.payload.inputId);
    },
  }
});

const { actions, reducer } = ideas;
export const { addIdea, editIdea, deleteIdea } = actions;
export default reducer;