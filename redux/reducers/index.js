import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todos";
import journals from "./journals";
import visions from "./visions";
import pic from "./newpic";

// combinedReducer import on index.js for multiple for store connection on multiple reducers
export default combineReducers({ visions, todos, journals, pic });
