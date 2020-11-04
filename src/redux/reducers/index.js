import { combineReducers } from "redux";

import chapters from "../slices/chapters";
import undoable from 'redux-undo'

export default combineReducers(
  {
    chapters: undoable(chapters)
  }
)
