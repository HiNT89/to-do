import { combineReducers } from "redux";
import reducerLogin from "./container/Login/reducer";
import reducerGlobal from "./container/Home/reducer";
const rootReducer = combineReducers({ reducerLogin, reducerGlobal });
export default rootReducer;
