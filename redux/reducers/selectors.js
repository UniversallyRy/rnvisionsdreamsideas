import { VISIBILITY_FILTERS } from "../../constants";

export const getNotesState = (store) => store.notes;

export const getNoteList = (store) =>
  getNotesState(store) ? getNotesState(store).allIds : [];

export const getNoteById = (store, id) =>
  getNotesState(store) ? { ...getNotesState(store).byIds[id], id } : {};

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getNotes = (store) =>
  getNoteList(store).map((id) => getNoteById(store, id));

export const getNotesByVisibilityFilter = (store, visibilityFilter) => {
  const allNotes = getNotes(store);
  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allNotes.filter((note) => note.completed);
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allNotes.filter((note) => !note.completed);
    case VISIBILITY_FILTERS.ALL:
    default:
      return allNotes;
  }
};
