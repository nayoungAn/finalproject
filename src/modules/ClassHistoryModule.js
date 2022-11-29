import { createActions, handleActions } from "redux-actions";
/* 초기값 */
const initialState = [];
/* 액션 */
export const GET_CLASSHISTORY = 'notice/GET_CLASSHISTORY';
export const POST_CLASSHISTORY = 'classHistory/POST_CLASSHISTORY';

const actions = createActions({
    [GET_CLASSHISTORY]: () => {},
    [POST_CLASSHISTORY]: () => {},
});
/* 리듀서 */
const classHistoryReducer = handleActions(
    {
      
        [GET_CLASSHISTORY] : (state, { payload }) => {
            return payload;
        },
        [POST_CLASSHISTORY] : (state, { payload }) => {
            return payload;
        }
        
    },
    initialState
);
export default classHistoryReducer;