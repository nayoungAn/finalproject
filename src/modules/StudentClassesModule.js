import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_STUDENTCLASS = 'student/GET_STUDENTCLASS';
export const GET_STUDENTSCLASS = 'student/GET_STUDENTSCLASS';


const actions = createActions({
    [GET_STUDENTCLASS]: () => {},
    [GET_STUDENTSCLASS]: () => {},
});

/* 리듀서 */
const StudentClassReducer = handleActions(
    {
        [GET_STUDENTCLASS] : (state, { payload }) => {
            return payload;
        },
        [GET_STUDENTSCLASS] : (state, { payload }) => {
            return payload;
        },
     
    },
    initialState
);

export default StudentClassReducer;