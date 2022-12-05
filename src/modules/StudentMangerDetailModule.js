import { createActions, handleActions } from "redux-actions";
/* 초기값 */
const initialState = [];
/* 액션 */
export const GET_STUDENTDETAIL = 'notice/GET_STUDENTDETAIL';
const actions = createActions({
    [GET_STUDENTDETAIL]: () => {}
});
/* 리듀서 */
const studentManagerDetailReducer = handleActions(
    {
      
        [GET_STUDENTDETAIL] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);
export default studentManagerDetailReducer;