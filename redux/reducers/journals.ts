import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';
import uuid from '../../utils/uuid';
import lorem from '../../shared/lorem';

export type JournalType = {
  title: string;
  body: string;
  id: string;
  date: string;
  isEditing: boolean;
}

export type JournalListType = {
  month: string;
  list: JournalType[];
}

const initialState = {
  month: 'All',
  list: [
    {
      title: 'Journal Entry 1',
      body: lorem,
      id: uuid.generate(),
      date: moment('2014-02-17').format('MMMM Do YYYY'),
      isEditing: false,
    },
    {
      title: 'Journal entry 2',
      body: lorem,
      id: uuid.generate(),
      date: moment('2017-11-07').format('MMMM Do YYYY'),
      isEditing: false,
    },
    {
      title: 'Journal Entry 33',
      body: lorem,
      id: uuid.generate(),
      date: moment('2020-07-30').format('MMMM Do YYYY'),
      isEditing: false,
    },
  ]
};

const journalsReducer = createSlice({
  name:'Journals',
  initialState: initialState,
  reducers: {
    addJournal: (state, action) => {
      state.list.push({
        title: action.payload.title,
        body: action.payload.body,
        id: uuid.generate(),
        date: moment().format('MMMM Do YYYY'),
        isEditing: false,
      })
    },
    deleteJournal: (state, action) => {
       state.list = state.list.filter((item) => item.id != action.payload.id); 
    },
    editJournal: (state, action) => {
      const index = state.list.findIndex(item => item.id === action.payload.id);
      state.list[index] = {
        ...state.list[index],
        ...action.payload,
      };
    },
    editJournalToggle: (state, action) => {
      state.list.map((item) => {
        if(item.id === action.payload.id){
          item.isEditing = !item.isEditing
        }
      });
    },
    changeMonth: (state, action) => {
      state.month = action.payload;
      return state;
    },
  },
  extraReducers: {
  },
})

const { actions, reducer } = journalsReducer;

export const { addJournal, deleteJournal, changeMonth, editJournal, editJournalToggle } = actions;
export default reducer;