import { combineReducers } from "redux";
import ridesReducer from "./ridesReducer";
import registerReducer from "./register";
import loginReducer from "./login";
import userReducer from "./userReducer"



export const rootReducer = combineReducers({
  registerReducer,
  loginReducer,
  ridesReducer,
  userReducer,
})
