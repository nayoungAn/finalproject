import memberReducer from "./MemberModule";
import consReducer from "./ConsModule";
import subjectReducer from "./SubjectModule";
import { combineReducers } from "redux";
import subjectListReducer from "./SubjectListModule";
import teacherListReducer from "./TeacherListModule";
import teacherReducer from "./TeacherModule";
import classReducer from "./ClassModule";
import accListReducer from "./AccListModule";
import accReducer from "./AccModule";
import smsListReducer from "./SmsListModule";
import teacherClassReducer from "./TeacherClassModule";
import studentManagerReducer from "./StudentManagerModule";
import studentManagerDetailReducer from "./StudentMangerDetailModule";
import classHistoryReducer from "./ClassHistoryModule";
const rootReducer = combineReducers({
    memberReducer,
    consReducer,
    subjectReducer,
    subjectListReducer,
    teacherReducer,
    teacherListReducer,
    accListReducer,
    accReducer,
    classReducer,
    accListReducer,
    accReducer,
    smsListReducer,
    teacherClassReducer,
    studentManagerReducer,
    studentManagerDetailReducer,
    classHistoryReducer
});

export default rootReducer;