import { createAction } from 'typesafe-actions';

// export const addText = (value) => ({
//   type: "ADD_TEXT",
//   payload: value,
// });

//  Visions
export const addVision = createAction("ADD_VISION", action => {
  return ({ uri, title, id }:any) => action({ uri, title, id });
});

export const editVision = createAction("EDIT_VISION", action => {
  return ({ task, id, complete }:any) => action({ task, id, complete });
});

export const deleteVision = createAction("DELETE_VISION", action => {
  return ( id :any) => action({ id });
});

export const addPic = createAction("ADD_PIC", action => {
  return (uri:any) => action({ uri }); 
});

// Journals
export const addJournal = createAction("ADD_JOURNAL", action => {
  return ({ title, body, id }:any) => action({ title, body, id });
});

export const editJournal = createAction("EDIT_JOURNAL", action => {
  return (id :any) => action({ id });
});

export const deleteJournal = createAction("DELETE_JOURNAL", action => {
  return (id :any) => action({ id });
});

// Notes
export const addNote = createAction("ADD_NOTE", action => {
  return ({ name, id }:any) => action({ name, id });
});

export const editNote = createAction("EDIT_NOTE", action => {
  return ({ name, id }:any) => action({ name, id });
});

export const deleteNote = createAction("DELETE_NOTE", action => {
  return (id :any) => action({ id });
});

// Todo Lists
export const addList = createAction("ADD_LIST", action => {
  return ({ name, id, color, todos }:any) => action({ name, id, color, todos });
});

export const deleteList = createAction("DELETE_LIST", action => {
  return (id :any) => action({ id });
});

// Todos
export const addTodo = createAction("ADD_TODO", action => {
  return ({ title, id, completed, name }:any) => action({ title, id, completed, name });
});

export const toggleTodo = createAction("TOGGLE_TODO", action => {
  return ({ todo, id }:any) => action({ todo, id });
});

export const editTodo = createAction("EDIT_TODO", action => {
  return (state :any) => action({ state });
});

export const deleteTodo = createAction("DELETE_TODO", action => {
  return (id :any) => action({ id });
});

export const setFilter = createAction("SET_FILTER", action => {
  return (filter :any) => action({ filter });
});
