import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_CON = 'cons/GET_CON';
export const GET_CONS = 'cons/GET_CONS';
export const POST_CONS = 'cons/POST_CONS';
export const PUT_CONS = 'cons/POST_CONS';
export const DELETE_CONS = 'cons/DELETE_CONS';

const actions = createActions({
    [GET_CON]: () => {},
    [GET_CONS]: () => {},
    [POST_CONS]: () => {},
    [PUT_CONS]: () => {},
    [DELETE_CONS]: () => {},
});

/* 리듀서 */
const consReducer = handleActions(
    {
        [GET_CON] : (state, { payload }) => {
            return payload;
        },
        [GET_CONS] : (state, { payload }) => {
            return payload;
        },
        [POST_CONS] : (state, { payload }) => {
            return payload;
        },
        [PUT_CONS] : (state, { payload }) => {
            return payload;
        },
        [DELETE_CONS] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default consReducer;