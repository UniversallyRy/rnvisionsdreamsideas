import { ADD_JOURNAL, EDIT_JOURNAL, DELETE_JOURNAL } from "../actionTypes";
import { ActionType } from 'typesafe-actions';
import * as journals from '../actions';
import uuid from "../../utils/uuid";
import moment from "moment";
import lorem from "../../shared/lorem";

export type JournalsAction = ActionType<typeof journals>;

 export interface JournalState {
    title: string;
    body: string;
    id: string;
    date: string;
}

const initialJournals:JournalState[] = [
  {
    title: "Add Task 1",
    body: lorem,
    id: uuid.generate(),
    date: moment("2014-02-17").format("MMMM Do YYYY"),
  },
  {
    title: "Add Task 2",
    body: lorem,
    id: uuid.generate(),
    date: moment("2017-11-07").format("MMMM Do YYYY"),
  },
  {
    title: "Add Task 33",
    body: lorem,
    id: uuid.generate(),
    date: moment("2020-07-30").format("MMMM Do YYYY"),
  },
];

export default function<JournalState, JournalAction>(state = initialJournals, action:any) {
  switch (action.type) {
    case ADD_JOURNAL:
      return [
        {
          title: action.payload.title,
          body: action.payload.body,
          id: uuid.generate(),
          date: moment().format("MMMM Do YYYY"),
        },
        ...state,
      ];

    case EDIT_JOURNAL:
      return {
        ...state,
      };

    case DELETE_JOURNAL:
      return state.filter((todo) => todo.id !== action.payload.id);

    default:
      return state;
  }
}
