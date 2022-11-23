import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_SUBJECT = 'subject/POST_SUBJECT';
export const PUT_SUBJECT = 'subject/PUT_SUBJECT';
export const DELETE_SUBJECT = 'subject/DELETE_SUBJECT';

const actions = createActions({
    [POST_SUBJECT]: () => {},
    [PUT_SUBJECT]: () => {},
    [DELETE_SUBJECT]: () => {}
});

/* 리듀서 */
const subjectReducer = handleActions(
    {
        [POST_SUBJECT] : (state, { payload }) => {
            return payload;
        },
        [PUT_SUBJECT] : (state, { payload }) => {
            return payload;
        },
        [DELETE_SUBJECT] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default subjectReducer;