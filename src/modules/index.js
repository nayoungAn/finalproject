import memberReducer from "./MemberMoudule";
import subjectReducer from "./SubjectModule";
import noticeReducer from "./NoticeModule";
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
    noticeReducer,
    teacherReducer,
    teacherListReducer
});

export default rootReducer;