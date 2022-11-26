import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SUBJECT = 'subject/GET_SUBJECT';
export const GET_SUBJECTS = 'subject/GET_SUBJECTS';

const actions = createActions({
    [GET_SUBJECT]: () => {},
    [GET_SUBJECTS]: () => {},
});

/* 리듀서 */
const subjectListReducer = handleActions(
    {
        [GET_SUBJECT] : (state, { payload }) => {
            return payload;
        },
        [GET_SUBJECTS] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default subjectListReducer;

