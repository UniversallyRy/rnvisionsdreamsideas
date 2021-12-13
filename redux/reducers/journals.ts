import { createSlice } from '@reduxjs/toolkit'
// import { ADD_JOURNAL, EDIT_JOURNAL, DELETE_JOURNAL } from "../actionTypes";
import uuid from "../../utils/uuid";
import moment from "moment";
import lorem from "../../shared/lorem";

export interface IJournalState {
   title: string;
   body: string;
   id: string;
   date: string;
}

const initialJournals:IJournalState[] = [
  {
    title: "Journal Entry 1",
    body: lorem,
    id: uuid.generate(),
    date: moment("2014-02-17").format("MMMM Do YYYY"),
  },
  {
    title: "Journal entry 2",
    body: lorem,
    id: uuid.generate(),
    date: moment("2017-11-07").format("MMMM Do YYYY"),
  },
  {
    title: "Journal Entry 33",
    body: lorem,
    id: uuid.generate(),
    date: moment("2020-07-30").format("MMMM Do YYYY"),
  },
];


const journals = createSlice({
  name:"Journals",
  initialState: initialJournals,
  reducers:{
    addJournal: (state, action) => {
      state.push({
        title: action.payload.title,
        body: action.payload.body,
        id: uuid.generate(),
        date: moment().format("MMMM Do YYYY")
      })
    },
    deleteJournal: (state, action) => {
      return state.filter((todo) => todo.id != action.payload.id);
    },
    editJournal: (state, action) => {
      return state;
    }
  },
  extraReducers: {
  }
  // .addCase(DELETE_JOURNAL, (state, action) => {
  //   return state.filter((todo) => todo.id != action.payload.id);
  //   })
  // .addCase(EDIT_JOURNAL, (state, action) => {
  //   return state;
  // })
})
// const journals = createReducer(initialJournals, (builder) => {
//   builder
//   .addCase(ADD_JOURNAL, (state, action) => {
//     state.push({
//       title: action.payload.title,
//       body: action.payload.body,
//       id: uuid.generate(),
//       date: moment().format("MMMM Do YYYY"),
//     })
//   })
//   .addCase(DELETE_JOURNAL, (state, action) => {
//     return state.filter((todo) => todo.id != action.payload.id);
//     })
//   .addCase(EDIT_JOURNAL, (state, action) => {
//     return state;
//   })
// })

const { actions, reducer } = journals
export const { addJournal, deleteJournal} = actions;
export default reducer