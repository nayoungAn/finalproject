import memberReducer from "./MemberModule";
import { combineReducers } from "redux";
import subjectReducer from "./SubjectModule";
import subjectListReducer from "./SubjectListModule";
import teacherReducer from "./TeacherModule";

const rootReducer = combineReducers({
    memberReducer,
    subjectReducer,
    subjectListReducer,
    teacherReducer
});

export default rootReducer;