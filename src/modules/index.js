import memberReducer from "./MemberModule";
import consReducer from "./ConsModule";
import subjectReducer from "./SubjectModule";
import { combineReducers } from "redux";
import subjectListReducer from "./SubjectListModule";
import teacherListReducer from "./TeacherListModule";
import teacherReducer from "./TeacherModule";
import qnaListReducer from "./QnaListModule";
import classReducer from "./ClassModule";
import accListReducer from "./AccListModule";
import accReducer from "./AccModule";
import smsListReducer from "./SmsListModule";
import teacherClassReducer from "./TeacherClassModule";
import qnaReducer from "./QnaModule";
import studentQnaReducer from "./StudentQnaModule";
import studentClassReducer from "./StudentClassesModule";

const rootReducer = combineReducers({
    memberReducer,
    consReducer,
    subjectReducer,
    subjectListReducer,
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
    studentClassReducer

});

export default rootReducer;