import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  auth: authReducers,
  errors: errorReducer,
  profile: profileReducer
});
