import {
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  TOGGLE_NOTE,
  ADD_LIST,
  DELETE_LIST,
} from "../actionTypes";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";

const initialValue = [
  {
    name: "Plan A Trip",
    id: uuidv4(),
    color: "#FE1F14",
    notes: [
      {
        title: "Book Flight",
        completed: false,
        id: uuidv4(),
      },
      {
        title: "Passport Check",
        completed: false,
        id: uuidv4(),
      },
      {
        title: "Reserve Hotel",
        completed: true,
        id: uuidv4(),
      },
      {
        title: "Pack Luggage",
        completed: false,
        id: uuidv4(),
      },
    ],
  },
  {
    name: "Errands",
    id: uuidv4(),
    color: "#000000",
    notes: [
      {
        title: "Store",
        completed: true,
        id: uuidv4(),
      },
      {
        title: "Hike",
        completed: false,
        id: uuidv4(),
      },
      {
        title: "Take a video",
        completed: true,
        id: uuidv4(),
      },
      {
        title: "Walk Dog",
        completed: true,
        id: uuidv4(),
      },
    ],
  },
  {
    name: "Party",
    id: uuidv4(),
    color: "#2E4045",
    notes: [
      {
        title: "Ballons",
        completed: false,
        id: uuidv4(),
      },
      {
        title: "Make Dinner",
        completed: false,
        id: uuidv4(),
      },
      {
        title: "Send Invites",
        completed: true,
        id: uuidv4(),
      },
    ],
  },
];

export default produce((draft, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return (state = initialValue);

    // return draft.map((item) => {
    //   if (newNotes.name === action.payload.name) {
    //     return [
    //       ...draft,
    //       {
    //         title: action.payload.title,
    //         id: uuidv4(),
    //         completed: false,
    //       },
    //     ];
    //   }
    //   i++;
    // });

    case ADD_LIST:
      return [
        {
          name: action.payload.name,
          id: uuidv4(),
          color: action.payload.color,
          notes: [],
        },
        ...draft,
      ];

    case DELETE_LIST:
      return draft.filter((list) => list.id != action.payload.id);

    case EDIT_NOTE:
      const newState = action.payload.draft;
      return newState;

    case TOGGLE_NOTE:
      const { payload } = action;
      let { items } = draft;

      return draft;

    // return { notes, ...draft }
    case DELETE_NOTE:
      return draft.filter((list) => list.notes.id != action.payload.id);
  }
}, initialValue);
