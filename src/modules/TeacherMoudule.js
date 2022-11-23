import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_TEACHER_REGISTER = 'teacher/POST_TEACHER_REGISTER';
export const GET_TEACHER = "member/GET_TEACHER";
export const GET_TEACHERS = 'member/GET_TEACHERS';

const actions = createActions({
    [POST_TEACHER_REGISTER] : () => {},
    [GET_TEACHER]: () => {}, 
    [GET_TEACHERS]: () => {},
});

const teacherReducer = handleActions(
    {
        [POST_TEACHER_REGISTER] : (state, { payload }) => {
            return payload
        },
        [GET_TEACHER]: (state, { payload}) => {
            return payload
        },        
        [GET_TEACHERS] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default teacherReducer;