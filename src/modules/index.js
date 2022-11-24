import memberReducer from "./MemberModule";
import { combineReducers } from "redux";
import subjectReducer from "./SubjectModule";
import subjectListReducer from "./SubjectListModule";
import teacherListReducer from "./TeacherListModule";
import teacherReducer from "./TeacherModule";
import classReducer from "./ClassModule";
const rootReducer = combineReducers({
    memberReducer,
    subjectReducer,
    subjectListReducer,
    teacherReducer,
    teacherListReducer,
    classReducer
});

export default rootReducer;