import memberReducer from "./MemberMoudule";
import subjectReducer from "./SubjectModule";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    memberReducer,
    subjectReducer
});

export default rootReducer;