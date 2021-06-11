import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  ADD_LIST,
  DELETE_LIST,
} from "../actionTypes";
import uuid from "../../utils/uuid";
import produce from "immer";
import merge from "deepmerge";

const initialValue = [
  {
    name: "Plan A Trip",
    id: uuid.generate(),
    color: "#FE1F14",
    todos: [
      {
        title: "Book Flight",
        id: uuid.generate(),
        completed: false,
      },
      {
        title: "Passport Check",
        id: uuid.generate(),
        completed: false,
      },
      {
        title: "Reserve Hotel",
        id: uuid.generate(),
        completed: true,
      },
      {
        title: "Pack Luggage",
        id: uuid.generate(),
        completed: false,
      },
    ],
  },
  {
    name: "Errands",
    id: uuid.generate(),
    color: "#83ADB5",
    todos: [
      {
        title: "Store",
        id: uuid.generate(),
        completed: true,
      },
      {
        title: "Hike",
        id: uuid.generate(),
        completed: false,
      },
      {
        title: "Take a video",
        id: uuid.generate(),
        completed: true,
      },
      {
        title: "Walk Dog",
        id: uuid.generate(),
        completed: true,
      },
    ],
  },
  {
    name: "Party",
    id: uuid.generate(),
    color: "#2E4045",
    todos: [
      {
        title: "Ballons",
        id: uuid.generate(),
        completed: false,
      },
      {
        title: "Make Dinner",
        id: uuid.generate(),
        completed: false,
      },
      {
        title: "Send Invites",
        id: uuid.generate(),
        completed: true,
      },
    ],
  },
];

export default produce((draft, action) => {
  switch (action.type) {
    case ADD_LIST:
      return [
        {
          name: action.payload.name,
          id: uuid.generate(),
          color: action.payload.color,
          todos: [],
        },
        ...draft,
      ];

    case DELETE_LIST:
      return draft.filter((list) => list.id != action.payload.id);

    case ADD_TODO:
      let newDraft = Object.assign([{}], draft);

      newDraft.map((item) => {
        if (item.id == action.payload.listid) {
          item.todos.push({
            title: action.payload.title,
            id: uuid.generate(),
            completed: false,
          });
        }
      });
      return draft;

    case EDIT_TODO:
      const newState = action.payload.draft;
      return newState;

    case TOGGLE_TODO:
      const { payload } = action;
      let { items } = draft;

      return draft;

    // return { todos, ...draft }
    case DELETE_TODO:
      let newDr = Object.assign([{}], draft);

      newDr.map((item) => {
        if (item.id == action.payload.listid) {
          item.todos.filter((todo) => todo.id != action.payload.id);
        }
      });
      return newDr;

    default:
      return draft;
  }
}, initialValue);
