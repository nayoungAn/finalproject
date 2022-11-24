import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const PUT_TEACHER = "member/PUT_TEACHER";
export const DELETE_TEACHER = 'member/DELETE_TEACHER';
export const POST_TEACHER_REGISTER = 'member/POST_TEACHER_REGISTER';
const actions = createActions({
    [PUT_TEACHER]: () => {}, 
    [DELETE_TEACHER]: () => {},
    [POST_TEACHER_REGISTER]: () => {}
});

const teacherReducer = handleActions(
    {
        [PUT_TEACHER]: (state, { payload}) => {
            return payload
        },        
        [DELETE_TEACHER] : (state, { payload }) => {
            return payload;
        },  
        [POST_TEACHER_REGISTER] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default teacherReducer;