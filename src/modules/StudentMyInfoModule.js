import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_STUDENTMYINFO = "student/GET_STUDENTMYINFO";
export const GET_STUDENT = 'student/GET_STUDENT';
export const POST_STUDENTMYINFO = 'student/POST_STUDENTMYINFO';
export const PUT_STUDENTMYINFO = 'student/PUT_STUDENTMYINFO';

const actions = createActions({
    [GET_STUDENTMYINFO]: () => {},
    [GET_STUDENT]: () => {},
    [POST_STUDENTMYINFO]: () => {},
    [PUT_STUDENTMYINFO]: () => {}
});

/* 리듀서 */
const studentMyInfoReducer = handleActions(
    {
        [GET_STUDENTMYINFO] : (state, { payload }) => {
            return payload;
        },
        [GET_STUDENT] : (state, { payload }) => {
            return payload;
        },
        [POST_STUDENTMYINFO] : (state, { payload }) => {
            return payload;
        },
        [PUT_STUDENTMYINFO] : (state, { payload }) => {
            return payload;
        }

    },
    initialState
);

export default studentMyInfoReducer;