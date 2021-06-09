import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from "../actionTypes";
import uuid from "../../utils/uuid";
import produce from "immer";

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
export default function (state = initialNotes, action) {
  switch (action.type) {
    case ADD_NOTE:
      return [
        ...state,
        {
          name: action.payload.name,
          id: uuid.generate(),
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
