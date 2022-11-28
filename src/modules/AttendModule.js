import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_ATTEND = 'attend/GET_ATTEND';
export const PUT_ATTEND = 'attend/PUT_ATTEND';

const actions = createActions({
    [GET_ATTEND]: () => {},
    [PUT_ATTEND]: () => {}
});

/* 리듀서 */
const attendReducer = handleActions(
    {
        [GET_ATTEND] : (state, { payload }) => {
            return payload;
        },
        [PUT_ATTEND] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default attendReducer;