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

const initialValue = [
  {
    name: "Plan A Trip",
    id: uuid.generate(),
    color: "#FE1F14",
    todos: [
      {
        title: "Book Flight",
        completed: false,
        id: uuid.generate(),
      },
      {
        title: "Passport Check",
        completed: false,
        id: uuid.generate(),
      },
      {
        title: "Reserve Hotel",
        completed: true,
        id: uuid.generate(),
      },
      {
        title: "Pack Luggage",
        completed: false,
        id: uuid.generate(),
      },
    ],
  },
  {
    name: "Errands",
    id: uuid.generate(),
    color: "#000000",
    todos: [
      {
        title: "Store",
        completed: true,
        id: uuid.generate(),
      },
      {
        title: "Hike",
        completed: false,
        id: uuid.generate(),
      },
      {
        title: "Take a video",
        completed: true,
        id: uuid.generate(),
      },
      {
        title: "Walk Dog",
        completed: true,
        id: uuid.generate(),
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
        completed: false,
        id: uuid.generate(),
      },
      {
        title: "Make Dinner",
        completed: false,
        id: uuid.generate(),
      },
      {
        title: "Send Invites",
        completed: true,
        id: uuid.generate(),
      },
    ],
  },
];

export default produce((draft, action) => {
  switch (action.type) {
    case ADD_TODO:
      return (state = initialValue);

    // return draft.map((item) => {
    //   if (newTodos.name === action.payload.name) {
    //     return [
    //       ...draft,
    //       {
    //         title: action.payload.title,
    //         id: uuid.generate(),
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
          id: uuid.generate(),
          color: action.payload.color,
          todos: [],
        },
        ...draft,
      ];

    case DELETE_LIST:
      return draft.filter((list) => list.id != action.payload.id);

    case EDIT_TODO:
      const newState = action.payload.draft;
      return newState;

    case TOGGLE_TODO:
      const { payload } = action;
      let { items } = draft;

      return draft;

    // return { todos, ...draft }
    case DELETE_TODO:
      return draft.filter((list) => list.todos.id != action.payload.id);
  }
}, initialValue);
