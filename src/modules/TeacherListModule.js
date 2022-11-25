import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_TEACHER = "member/GET_TEACHER";
export const GET_TEACHERS = 'member/GET_TEACHERS';

// const actions = createActions({
//     [GET_TEACHER]: () => {}, 
//     [GET_TEACHERS]: () => {},
// });

const teacherListReducer = handleActions(
    {
        [GET_TEACHER]: (state, { payload}) => {
            return payload
        },        
        [GET_TEACHERS] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default teacherListReducer;