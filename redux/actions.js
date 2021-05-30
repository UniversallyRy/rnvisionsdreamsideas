import {
  ADD_PIC,
  TOGGLE_NOTE,
  ADD_VISION,
  EDIT_VISION,
  DELETE_VISION,
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  SET_FILTER,
  EDIT_JOURNAL,
  ADD_JOURNAL,
  DELETE_JOURNAL,
  ADD_LIST,
  DELETE_LIST,
} from "./actionTypes";

export const addText = (value) => ({
  type: "ADD_TEXT",
  payload: value,
});

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

export const addList = ({ name, id, color, notes }) => ({
  type: ADD_LIST,
  payload: {
    name,
    id,
    color,
    notes,
  },
});

export const deleteList = (id) => ({
  type: DELETE_LIST,
  payload: {
    id,
  },
});

export const addNote = ({ title, id, completed, name }) => ({
  type: ADD_NOTE,
  payload: {
    title,
    id,
    completed,
    name,
  },
});

export const toggleNote = ({ id, note }) => ({
  type: TOGGLE_NOTE,
  payload: {
    id,
    note,
  },
});

export const editNote = (state) => ({
  type: EDIT_NOTE,
  payload: {
    state,
  },
});

export const deleteNote = (id) => ({
  type: DELETE_NOTE,
  payload: {
    id,
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

export const addPic = (uri) => ({
  type: ADD_PIC,
  payload: {
    uri,
  },
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: {
    filter,
  },
});
