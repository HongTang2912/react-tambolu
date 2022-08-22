import { combineReducers } from "redux";
import loginReducer from "./login";
import saveAccountReducer from "./saveAccount"
import cartProductReducer from './cart_product'
import paginateReducer from './paginate'
import searchReducer from './search'

const rootReducer = combineReducers({
  user: loginReducer,
  save_account: saveAccountReducer,
  cart: cartProductReducer,
  paginator: paginateReducer,
  search: searchReducer
});

export default rootReducer;
