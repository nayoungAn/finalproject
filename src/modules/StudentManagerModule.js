import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_STUDENTLIST = "student/GET_STUDENTLIST";
export const GET_STUDENT = 'student/GET_STUDENT';
export const POST_STUDENT = 'student/POST_STUDENT';
export const PUT_STUDENT = 'student/PUT_STUDENT';
export const GET_CHECKID = 'student/GET_CHECKID';

const actions = createActions({
    [GET_STUDENTLIST]: () => {},
    [GET_STUDENT]: () => {},
    [POST_STUDENT]: () => {},
    [PUT_STUDENT]: () => {},
    [GET_CHECKID]: () => {},
    
});

/* 리듀서 */
const studentManagerReducer = handleActions(
    {
        [GET_STUDENTLIST] : (state, { payload }) => {
            return payload;
        },
        [GET_STUDENT] : (state, { payload }) => {
            return payload;
        },
        [POST_STUDENT] : (state, { payload }) => {
            return payload;
        },
        [PUT_STUDENT] : (state, { payload }) => {
            return payload;
        },
        [GET_CHECKID] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default studentManagerReducer;