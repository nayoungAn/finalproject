import memberReducer from "./MemberMoudule";
import subjectReducer from "./SubjectModule";
import { combineReducers } from "redux";
import subjectListReducer from "./SubjectListModule";

const rootReducer = combineReducers({
    memberReducer,
    subjectReducer,
    subjectListReducer
});

export default rootReducer;