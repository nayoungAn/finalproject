import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_STUDENTQNA = 'student/GET_STUDENTQNA';
export const GET_STUDENTSQNA = 'student/GET_STUDENTSQNA';
export const POST_STUDENTQNA = 'student/POST_STUDENTQNA';
export const PUT_STUDENTQNA = 'student/PUT_STUDENTQNA';
export const DELETE_STUDENTQNA = 'student/DELETE_STUDENTQNA';

const actions = createActions({
    [GET_STUDENTQNA]: () => {},
    [GET_STUDENTSQNA]: () => {},
    [POST_STUDENTQNA]: () => {},
    [PUT_STUDENTQNA]: () => {},
    [DELETE_STUDENTQNA]: () => {},
});

/* 리듀서 */
const StudentQnaReducer = handleActions(
    {
        [GET_STUDENTQNA] : (state, { payload }) => {
            return payload;
        },
        [GET_STUDENTSQNA] : (state, { payload }) => {
            return payload;
        },
        [POST_STUDENTQNA] : (state, { payload }) => {
            return payload;
        },
        [PUT_STUDENTQNA] : (state, { payload }) => {
            return payload;
        },
        [DELETE_STUDENTQNA] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default StudentQnaReducer;