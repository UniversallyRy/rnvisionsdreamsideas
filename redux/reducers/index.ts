import { combineReducers } from "redux";
import visions from "./visions";
import pic from "./newpic";
import journals from "./journals";
import notes from "./note";
import todos from "./todos";

// combinedReducer import on index.js for multiple for store connection on multiple reducers
export default combineReducers({ visions, pic, journals, todos, notes });
