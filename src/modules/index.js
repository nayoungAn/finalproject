
import memberReducer from "./MemberModule";

import consReducer from "./ConsModule";

import subjectReducer from "./SubjectModule";

import { combineReducers } from "redux";
import subjectListReducer from "./SubjectListModule";
import teacherListReducer from "./TeacherListModule";
import teacherReducer from "./TeacherModule";
import teacherClassReducer from "./TeacherClassModule";

const rootReducer = combineReducers({
    memberReducer,
    consReducer,
    subjectReducer,
    subjectListReducer,
    teacherReducer,
    teacherListReducer,
    teacherClassReducer
    
});

export default rootReducer;