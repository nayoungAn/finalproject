import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_ATTEND_CHECK = 'attend/GET_ATTEND_CHECK';

const actions = createActions({
    [GET_ATTEND_CHECK]: () => {}
});

/* 리듀서 */
const attendCheckReducer = handleActions(
    {
        [GET_ATTEND_CHECK] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default attendCheckReducer;