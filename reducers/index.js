import { combineReducers } from "redux";
import loginReducer from "./login";
import saveAccountReducer from "./saveAccount"

const rootReducer = combineReducers({
  user: loginReducer,
  save_account: saveAccountReducer
});

export default rootReducer;
