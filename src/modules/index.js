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
import studentQnaReducer from "./StudentQnaModule";
import studentClassReducer from "./StudentClassesModule";
import studentMyInfoModuleReducer from "./StudentMyInfoModule";

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
    studentQnaReducer,
    studentClassReducer,
    studentMyInfoModuleReducer

});

export default rootReducer;