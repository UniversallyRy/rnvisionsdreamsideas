import { ADD_PIC, TOGGLE_TODO, ADD_VISION, EDIT_VISION, DELETE_VISION, ADD_TODO, EDIT_TODO, DELETE_TODO, SET_FILTER, EDIT_JOURNAL, ADD_JOURNAL, DELETE_JOURNAL, ADD_LIST } from "./actionTypes";

export const addText = value => ({
  type: "ADD_TEXT",
  payload: value
});

export const addList = ({ name, color }) => ({
  type: ADD_LIST,
  payload: {name, color},
});

export const addVision = ({ uri, title, id })  => ({
  type: ADD_VISION,
  payload: {
    uri,
    title,
    id
  }
});

export const editVision = ({ task, id, complete }) => ({
type: EDIT_VISION,
payload: { task, id, complete }
});

export const deleteVision = id => ({
type: DELETE_VISION,
payload: { id }
});

export const addTodo = ( title, id )  => ({
    type: ADD_TODO,
    payload: {
      title,
      id
  }
});

export const toggleTodo = ({ id, todo }) => ({
  type: TOGGLE_TODO,
  payload: { id , todo}
});

export const editTodo = state => ({
  type: EDIT_TODO,
  payload: { state }
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  payload: { id, }
});

export const addJournal = ({ title, body, id })  => ({
  type: ADD_JOURNAL,
  payload: {
    title,
    body,
    id
  }
});

export const editJournal = id => ({
  type: EDIT_JOURNAL,
  payload: { id }
});

export const deleteJournal = id => ({
  type: DELETE_JOURNAL,
  payload: { id }
});

export const addPic = uri  => ({
  type: ADD_PIC,
  payload: {
    uri
  }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });