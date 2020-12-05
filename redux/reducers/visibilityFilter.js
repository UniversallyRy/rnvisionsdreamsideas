import { SET_FILTER } from "../actionTypes";
import { VISIBILITY_FILTERS } from "../../constants";

const initialState = VISIBILITY_FILTERS.ALL;

function visibilityFilter(action, state = initialState) {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
}

export default visibilityFilter;