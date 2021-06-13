import { SET_FILTER } from "../actionTypes";
import { VISIBILITY_FILTERS } from "../../constants";
import { createReducer } from '@reduxjs/toolkit'

const initialState = VISIBILITY_FILTERS.ALL;

const visibilityFilter = createReducer(initialState, (builder) => {
  builder
    .addCase(SET_FILTER, (state, action) => {
      return action.filter;
    })
  });

export default visibilityFilter
