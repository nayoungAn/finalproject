import memberReducer from "./MemberMoudule";
import subjectReducer from "./SubjectModule";
import noticeReducer from "./NoticeModule";
import { combineReducers } from "redux";
import subjectListReducer from "./SubjectListModule";

const rootReducer = combineReducers({
    memberReducer,
    subjectReducer,
    subjectListReducer,
    noticeReducer
});

export default rootReducer;