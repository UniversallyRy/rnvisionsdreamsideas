import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  ADD_LIST,
  DELETE_LIST,
} from "../actionTypes";
import uuid from "../../utils/uuid";
import { createReducer } from '@reduxjs/toolkit'

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

const todos = createReducer(initialValue, (builder) => {
  builder
  .addCase(ADD_LIST, (state, action) => {
    state.push({
          name: action.payload.name,
          id: uuid.generate(),
          color: action.payload.color,
          todos: [],
    })
  })
  .addCase(DELETE_LIST, (state, action) => {
    return state.filter((todo) => todo.id != action.payload.id);
  })
  .addCase(ADD_TODO, (state, action) => {
      state.map((item) => {
        if (item.id == action.payload.listid) {
          item.todos.push({
            title: action.payload.title,
            id: uuid.generate(),
            completed: false,
          });
        }
      });
  })
  .addCase(EDIT_TODO, (state, action) => {
    return state.filter((todo) => todo.id != action.payload.id);
  })
  .addCase(TOGGLE_TODO, (state, action) => {
    state.map((item) => {
      if (item.id == action.payload.listid ) {
        item.todos.map((todo) => {
          if(todo.id == action.payload.id) {
            todo.completed = !todo.completed
          }
        })
      }
    });
  })
  .addCase(DELETE_TODO, (state, action) => {
      state.map((item) => {
        if (item.id == action.payload.listid) {
          item.todos = item.todos.filter((todo) => todo.id != action.payload.id);
        }
      });
      return state;
  })
});

export default todos;