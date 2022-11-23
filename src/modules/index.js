import memberReducer from "./MemberMoudule";
import { combineReducers } from "redux";
import subjectReducer from "./SubjectModule";
import subjectListReducer from "./SubjectListModule";
import teacherReducer from "./TeacherMoudule";

const rootReducer = combineReducers({
    memberReducer,
    subjectReducer,
    subjectListReducer,
    teacherReducer
});

export default rootReducer;