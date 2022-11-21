import memberReducer from "./MemberMoudule";
import consReducer from "./ConsModule";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    memberReducer,
    consReducer
});

export default rootReducer;