import { createActions, handleActions } from "redux-actions";
/* 초기값 */
const initialState = [];
/* 액션 */
export const GET_STUDENTDETAIL = 'notice/GET_STUDENTDETAIL';
export const GET_CLASS = "student/GET_CLASS";
export const GET_CHECKEMAIL = "student/GET_CHECKEMAIL";

const actions = createActions({
    [GET_STUDENTDETAIL]: () => {},
    [GET_CLASS]: () => {},
    [GET_CHECKEMAIL]: () => {}
});

/* 리듀서 */
const studentManagerDetailReducer = handleActions(
    {
      
        [GET_STUDENTDETAIL] : (state, { payload }) => {
            return payload;
        },
        [GET_CLASS] : (state, { payload }) => {
            return payload;
        },
        [GET_CHECKEMAIL] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);
export default studentManagerDetailReducer;