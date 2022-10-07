import { createSlice } from '@reduxjs/toolkit';
import uuid from "../../utils/uuid";

export type VisionType = {
  uri: string;
  title: string;
  id: string;
}

const initialVisions: VisionType[] = Array.from({ length: 8 }).map((_, i) => {

  return {
    uri: `https://picsum.photos/200${i}`,
    title: `This is the title ${i + 1}!`,
    id: uuid.generate(),
  };

});

const visions = createSlice({
  name: "Visions",
  initialState: initialVisions,
  reducers: {
    addVision: (state, action): void => {
      state.unshift({
        uri: action.payload.uri,
        title: action.payload.title,
        id: uuid.generate(),
      })
    },
    editVision: (state, _action) => state,
    deleteVision: (state, action) => state.filter((item) => item.id != action.payload.id)
  }
});

const { actions, reducer } = visions;

export const { addVision, deleteVision, editVision } = actions;
export default reducer;
