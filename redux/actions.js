import { ADD_TODO, DELETE_TODO, SET_FILTER } from "./actionTypes";

let nextTodoId = 0;

export const addTodo = todo => {
  return {
  type: ADD_TODO,
  payload: todo
  }
};

export const toggleTodo = id => ({
  type: DELETE_TODO,
  payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
