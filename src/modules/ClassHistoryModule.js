import { createActions, handleActions } from "redux-actions";
/* 초기값 */
const initialState = [];
/* 액션 */
export const GET_CLASS_HISTORY = 'classHistory/GET_CLASS_HISTORY';
export const POST_CLASS_HISTORY = 'classHistory/POST_CLASS_HISTORY';
export const PUT_CLASS_HISTORY = 'classHistory/PUT_CLASS-HISTORY';

const actions = createActions({
    [GET_CLASS_HISTORY]: () => {},
    [POST_CLASS_HISTORY]: () => {},
    [PUT_CLASS_HISTORY]: () => {}
});
/* 리듀서 */
const classHistoryReducer = handleActions(
    {
        [GET_CLASS_HISTORY] : (state, { payload }) => {
            return payload;
        },
        [PUT_CLASS_HISTORY] : (state, {payload}) => {
            return payload;
        }
        
    },
    initialState
);
export default classHistoryReducer;