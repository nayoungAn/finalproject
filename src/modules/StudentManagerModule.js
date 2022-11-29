import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_STUDENTLIST = "notice/GET_STUDENTLIST";
export const GET_STUDENT = 'notice/GET_STUDENT';
export const POST_STUDENT = 'notice/POST_STUDENT';
export const PUT_STUDENT = 'notice/PUT_STUDENT';

const actions = createActions({
    [GET_STUDENTLIST]: () => {},
    [GET_STUDENT]: () => {},
    [POST_STUDENT]: () => {},
    [PUT_STUDENT]: () => {}
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
        }

    },
    initialState
);

export default studentManagerReducer;