import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todos";
import journals from './journals'
import visions from './visions'

export default combineReducers({ visions, todos, journals, visibilityFilter });