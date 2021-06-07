import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from "../actionTypes";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";

const initialNotes = [
  {
    name: "This is a default note",
    id: uuidv4(),
  },
  {
    name: "This is a 2nd note",
    id: uuidv4(),
  },
];
export default function (state = initialNotes, action) {
  switch (action.type) {
    case ADD_NOTE:
      return [
        ...state,
        {
          name: action.payload.name,
          id: uuidv4(),
        },
      ];

    case EDIT_NOTE:
      const newState = action.payload.draft;
      return newState;

    // return { todos, ...draft }
    case DELETE_NOTE:
      return state.filter((note) => note.id != action.payload.id);

    default:
      return state;
  }
}
