import subjectReducer from "./SubjectModule";
import noticeReducer from "./NoticeModule";
import memberReducer from "./MemberModule";
import { combineReducers } from "redux";
import subjectListReducer from "./SubjectListModule";
import teacherListReducer from "./TeacherListModule";
import teacherReducer from "./TeacherModule";
import studentManagerReducer from "./StudentManagerModule";

const rootReducer = combineReducers({
    memberReducer,
    subjectReducer,
    subjectListReducer,
    noticeReducer,
    studentManagerReducer,
    teacherReducer,
    teacherListReducer
});

export default rootReducer;