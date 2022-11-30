import { createActions, handleActions } from "redux-actions";
/* 초기값 */
const initialState = [];
/* 액션 */
export const POST_CLASSHISTORY = 'classHistory/POST_CLASSHISTORY';

const actions = createActions({
    [POST_CLASSHISTORY]: () => {}
});
/* 리듀서 */
const classHistoryReducer = handleActions(
    {
        [POST_CLASSHISTORY] : (state, { payload }) => {
            return payload;
        }
        
    },
    initialState
);
export default classHistoryReducer;