import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from "../actionTypes";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";

const initialValue = [
  {
    name: "This is a default note",
    id: 2,
  },
];

export default produce((draft, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return [
        {
          name: action.payload.name,
          id: uuidv4(),
        },
        ...draft,
      ];

    case EDIT_NOTE:
      const newState = action.payload.draft;
      return newState;

    // return { todos, ...draft }
    case DELETE_NOTE:
      return draft.filter((list) => list.notes.id != action.payload.id);
  }
}, initialValue);
