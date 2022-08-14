import { combineReducers } from "redux";
import loginReducer from "./login";
import saveAccountReducer from "./saveAccount"
import cartProductReducer from './cart_product'

const rootReducer = combineReducers({
  user: loginReducer,
  save_account: saveAccountReducer,
  cart: cartProductReducer
});

export default rootReducer;
