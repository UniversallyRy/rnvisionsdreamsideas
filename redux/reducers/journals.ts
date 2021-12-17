import { createSlice } from '@reduxjs/toolkit'
import uuid from "../../utils/uuid";
import moment from "moment";
import lorem from "../../shared/lorem";

export interface IJournalState {
   monthFilter: string;
   journals: {
    title: string;
    body: string;
    id: string;
    date: string;
   }[];
}

const initialJournals:IJournalState = {
  monthFilter: 'Nov',
  journals:[
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
  ]
};


const journalsReducer = createSlice({
  name:"Journals",
  initialState: initialJournals,
  reducers:{
    addJournal: (state, action) => {
      state.journals.push({
        title: action.payload.title,
        body: action.payload.body,
        id: uuid.generate(),
        date: moment().format("MMMM Do YYYY")
      })
    },
    deleteJournal: (state, action) => {
      return state.journals.filter((todo) => todo.id != action.payload.id);
    },
    editJournal: (state, action) => {
      return state;
    },
    changeMonth: (state, action) => {
      state.monthFilter = action.payload;
      return state;
    },
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

const { actions, reducer } = journalsReducer;
export const { addJournal, deleteJournal, changeMonth } = actions;
export default reducer