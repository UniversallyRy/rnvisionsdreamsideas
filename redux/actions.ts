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
import { createAction } from '@reduxjs/toolkit'


export const addVision = createAction(ADD_VISION);
export const editVision = createAction(EDIT_VISION);
export const deleteVision = createAction(DELETE_VISION);
export const addPic = createAction(ADD_PIC);


export const addJournal = createAction(ADD_JOURNAL)
export const editJournal = createAction(EDIT_JOURNAL);
export const deleteJournal = createAction(DELETE_JOURNAL)



export const addNote = createAction(ADD_NOTE);
export const editNote = createAction(EDIT_NOTE);
export const deleteNote = createAction(DELETE_NOTE);


export const addList = createAction(ADD_LIST);
export const deleteList = createAction(DELETE_LIST);


export const addTodo = createAction(ADD_TODO);
export const toggleTodo = createAction(TOGGLE_TODO);
export const editTodo = createAction(EDIT_TODO);
export const deleteTodo = createAction(DELETE_TODO);


export const setFilter = createAction(SET_FILTER);