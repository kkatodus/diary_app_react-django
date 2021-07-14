import {combineReducers} from "redux";
import navReducer from "./nav";

const allReducers = combineReducers({
    nav_active:navReducer
})

export default allReducers;