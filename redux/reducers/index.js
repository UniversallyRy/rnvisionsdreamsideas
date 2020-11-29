import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todos";
import journals from './journals'

export default combineReducers({ todos, journals, visibilityFilter });