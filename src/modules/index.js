import memberReducer from "./MemberModule";
import { combineReducers } from "redux";
import subjectReducer from "./SubjectModule";
import subjectListReducer from "./SubjectListModule";
import teacherListReducer from "./TeacherListModule";
import teacherReducer from "./TeacherModule";

const rootReducer = combineReducers({
    memberReducer,
    subjectReducer,
    subjectListReducer,
    teacherReducer,
    teacherListReducer
});

export default rootReducer;