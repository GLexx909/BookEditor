import { combineReducers } from "redux";

import { chapters } from "./chapters";
import { sections } from "./sections";

export default combineReducers(
  {
    chapters,
    sections
  }
)
