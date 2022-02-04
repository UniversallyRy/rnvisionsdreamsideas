import uuid from "../../utils/uuid";
import { createSlice } from '@reduxjs/toolkit'

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

const todos = createSlice( {
  name: "Todos",
  initialState: initialValue,
  reducers:{
    addList: (state, action) => {
      state.push({
        name: action.payload.name,
        id: uuid.generate(),
        color: action.payload.color,
        todos: [],
      })
    },
    deleteList: (state, action) => {
      return state.filter((todo) => todo.id != action.payload.id);
    },
    addTodo: (state, action) => {
      state.map((item) => {
        if (item.id == action.payload.listid) {
          item.todos.push({
            title: action.payload.title,
            id: uuid.generate(),
            completed: false,
          });
        }
      });
    },
    editTodo: (state, action) => {
      return state.filter((todo) => todo.id != action.payload.id);
    },
    toggleTodo: (state, action) => {
      state.map((item) => {
        if (item.id == action.payload.listid ) {
          item.todos.map((todo) => {
            if(todo.id == action.payload.id) {
              todo.completed = !todo.completed
            }
          })
        }
      });
    },
    deleteTodo: (state, action) => {
      state.map((item) => {
        if (item.id == action.payload.listid) {
          item.todos = item.todos.filter((todo) => todo.id != action.payload.id);
        }
      });
      return state;
    },
  }
});

const { actions, reducer } = todos;
export const { addList, deleteList, addTodo, editTodo, toggleTodo, deleteTodo} = actions;
export default reducer;