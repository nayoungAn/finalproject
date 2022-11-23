import memberReducer from "./MemberMoudule";

import consReducer from "./ConsModule";

import subjectReducer from "./SubjectModule";

import { combineReducers } from "redux";
import subjectListReducer from "./SubjectListModule";

const rootReducer = combineReducers({
    memberReducer,
    consReducer,
    subjectReducer,
    subjectListReducer
});

export default rootReducer;