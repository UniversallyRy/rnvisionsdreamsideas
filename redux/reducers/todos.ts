import { createSlice } from '@reduxjs/toolkit'
import uuid from "../../utils/uuid";

export type TodoType = {
  inputValue: string;
  inputId: string;
  completed?: boolean;
  listId?: string;
}

export type TodoListType = {
  name: string;
  id: string;
  color: string;
  todos: TodoType[];
  completedCount: number;
}

const initialListArr: TodoListType[] = [
  {
    name: "Plan A Trip",
    id: uuid.generate(),
    color: "#FE1F14",
    todos: [
      {
        inputValue: "Book Flight",
        inputId: uuid.generate(),
        completed: false,
      },
      {
        inputValue: "Passport Check",
        inputId: uuid.generate(),
        completed: false,
      },
      {
        inputValue: "Reserve Hotel",
        inputId: uuid.generate(),
        completed: true,
      },
      {
        inputValue: "Pack Luggage",
        inputId: uuid.generate(),
        completed: false,
      },
    ],
    completedCount: 1,
  },
  {
    name: "Errands",
    id: uuid.generate(),
    color: "#83ADB5",
    todos: [
      {
        inputValue: "Store",
        inputId: uuid.generate(),
        completed: true,
      },
      {
        inputValue: "Hike",
        inputId: uuid.generate(),
        completed: false,
      },
      {
        inputValue: "Take a video",
        inputId: uuid.generate(),
        completed: true,
      },
      {
        inputValue: "Walk Dog",
        inputId: uuid.generate(),
        completed: true,
      },
    ],
    completedCount: 3,
  },
  {
    name: "Party",
    id: uuid.generate(),
    color: "#2E4045",
    todos: [
      {
        inputValue: "Ballons",
        inputId: uuid.generate(),
        completed: false,
      },
      {
        inputValue: "Make Dinner",
        inputId: uuid.generate(),
        completed: false,
      },
      {
        inputValue: "Send Invites",
        inputId: uuid.generate(),
        completed: true,
      },
    ],
    completedCount: 1,
  },
];

const todosLists = createSlice( {
  name: "Todos",
  initialState: initialListArr,
  reducers:{
    addList: (state, action): void => {
      state.push({
        name: action.payload.name,
        id: uuid.generate(),
        color: action.payload.color,
        todos: [],
        completedCount: 0,
      })
    },
    setCompleted: (state, action): void => {
      state.map((item): void => {
        if (item.id == action.payload.listId) {
          item.completedCount = action.payload.count
        }
      });
    },
    decreaseCompleted: (state, action): void => {
      state.map((item): void => {
        if (item.id == action.payload.listId) {
          item.completedCount--;
        }
      });
    },
    deleteList: (state, action) => state.filter((list) => list.id != action.payload.listId),
    addTodo: (state, action): void => {
      state.map((item): void => {
        if (item.id == action.payload.listId) {
          item.todos.push({
            inputValue: action.payload.inputValue,
            inputId: uuid.generate(),
            completed: false,
          });
        }
      });
    },
    editTodo: (state, action) => state.filter((todo) => todo.id != action.payload.id),
    toggleTodo: (state, action): void => {
      state.map((item): void => {
        if (item.id == action.payload.listId ) {
          item.todos.map((todo): void => {
            if(todo.inputId == action.payload.inputId) {
              todo.completed = !todo.completed
            }
          })
        }
      });
    },
    deleteTodo: (state, action) => {
      state.map((item): void => {
        if (item.id == action.payload.listId) {
          item.todos = item.todos.filter((todo): boolean => todo.inputId != action.payload.inputId);
        }
      });
      return state;
    },
  }
});

const { actions, reducer } = todosLists;

export const { 
  addList, 
  setCompleted, 
  decreaseCompleted, 
  deleteList, 
  addTodo, 
  editTodo, 
  toggleTodo, 
  deleteTodo 
} = actions;

export default reducer;