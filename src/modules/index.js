import subjectReducer from "./SubjectModule";
import noticeReducer from "./NoticeModule";
import memberReducer from "./MemberModule";
import consReducer from "./ConsModule";
import { combineReducers } from "redux";
import subjectListReducer from "./SubjectListModule";
import teacherListReducer from "./TeacherListModule";
import teacherReducer from "./TeacherModule";
import studentManagerReducer from "./StudentManagerModule";
import qnaListReducer from "./QnaListModule";
import classReducer from "./ClassModule";
import accListReducer from "./AccListModule";
import accReducer from "./AccModule";
import smsListReducer from "./SmsListModule";
import teacherClassReducer from "./TeacherClassModule";
import qnaReducer from "./QnaModule";
import attendReducer from "./AttendModule";
import attendCheckReducer from "./AttendCheckModule";
import studentManagerDetailReducer from "./StudentMangerDetailModule";
import classHistoryReducer from "./ClassHistoryModule";
import classHistoryRefreshReducer from "./ClassHistoryRefreshModule";
import teacherHistoryReducer from "./TeacherHistoryModule";
const rootReducer = combineReducers({
    memberReducer,
    consReducer,
    subjectReducer,
    subjectListReducer,
    noticeReducer,
    studentManagerReducer,
    teacherReducer,
    teacherListReducer,
    qnaListReducer,
    accListReducer,
    accReducer,
    qnaReducer,
    classReducer,
    smsListReducer,
    teacherClassReducer,
    attendReducer,
    attendCheckReducer,
    studentManagerDetailReducer,
    classHistoryReducer,
    classHistoryRefreshReducer,
    teacherHistoryReducer
    
});

export default rootReducer;