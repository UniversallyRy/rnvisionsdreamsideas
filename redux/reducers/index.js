import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import notes from "./notes";
import journals from "./journals";
import visions from "./visions";
import pic from "./newpic";

// combinedReducer import on index.js for multiple for store connection on multiple reducers
export default combineReducers({ visions, notes, journals, pic });
