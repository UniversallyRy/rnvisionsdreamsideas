import {
  ADD_VISION,
  EDIT_VISION,
  DELETE_VISION,
  ADD_PIC,
  ADD_JOURNAL,
  EDIT_JOURNAL,
  DELETE_JOURNAL,
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  ADD_LIST,
  DELETE_LIST,
  ADD_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  SET_FILTER,
} from "./actionTypes";

// export const addText = (value) => ({
//   type: "ADD_TEXT",
//   payload: value,
// });

export const addVision = ({ uri, title, id }) => ({
  type: ADD_VISION,
  payload: {
    uri,
    title,
    id,
  },
});

export const editVision = ({ task, id, complete }) => ({
  type: EDIT_VISION,
  payload: { task, id, complete },
});

export const deleteVision = (id) => ({
  type: DELETE_VISION,
  payload: {
    id,
  },
});

export const addPic = (uri) => ({
  type: ADD_PIC,
  payload: {
    uri,
  },
});

export const addJournal = ({ title, body, id }) => ({
  type: ADD_JOURNAL,
  payload: {
    title,
    body,
    id,
  },
});

export const editJournal = (id) => ({
  type: EDIT_JOURNAL,
  payload: {
    id,
  },
});

export const deleteJournal = (id) => ({
  type: DELETE_JOURNAL,
  payload: {
    id,
  },
});

export const addNote = ({ name, id }) => ({
  type: ADD_NOTE,
  payload: {
    name,
    id,
  },
});

export const editNote = ({ name, id }) => ({
  type: EDIT_NOTE,
  payload: { name, id },
});

export const deleteNote = (id) => ({
  type: DELETE_NOTE,
  payload: {
    id,
  },
});

export const addList = ({ name, id, color, todos }) => ({
  type: ADD_LIST,
  payload: {
    name,
    id,
    color,
    todos,
  },
});

export const deleteList = (id) => ({
  type: DELETE_LIST,
  payload: {
    id,
  },
});

export const addTodo = ({ title, id, completed, name }) => ({
  type: ADD_TODO,
  payload: {
    title,
    id,
    completed,
    name,
  },
});

export const toggleTodo = ({ id, todo }) => ({
  type: TOGGLE_TODO,
  payload: {
    id,
    todo,
  },
});

export const editTodo = (state) => ({
  type: EDIT_TODO,
  payload: {
    state,
  },
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: {
    id,
  },
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: {
    filter,
  },
});
