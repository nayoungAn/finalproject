import { createActions, handleActions } from "redux-actions";
/* 초기값 */
const initialState = [];
/* 액션 */
export const GET_CLASS_HISTORY_REFRESH = 'history/GET_CLASS_HISTORY_REFRESH';

const actions = createActions({
    [GET_CLASS_HISTORY_REFRESH]: () => {}
});
/* 리듀서 */
const classHistoryRefreshReducer = handleActions(
    {
      
        [GET_CLASS_HISTORY_REFRESH] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);
export default classHistoryRefreshReducer;