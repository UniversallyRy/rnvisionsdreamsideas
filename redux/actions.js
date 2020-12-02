import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, SET_FILTER, TOGGLE_JOURNAL, ADD_JOURNAL, DELETE_JOURNAL } from "./actionTypes";

export const addTodo = task  => ({
    type: ADD_TODO,
    payload: {
      task
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  payload: { id }
});

export const addJournal = ({title, body, id})  => ({
  type: ADD_JOURNAL,
  payload: {
    title,
    body,
    id
}
});

export const toggleJournal = id => ({
  type: TOGGLE_JOURNAL,
  payload: { id }
});

export const deleteJournal = id => ({
  type: DELETE_JOURNAL,
  payload: { id }
})

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });