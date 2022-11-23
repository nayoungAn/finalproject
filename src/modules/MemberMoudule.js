import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_LOGIN = "member/POST_LOGIN";
export const POST_REGISTER = 'member/POST_REGISTER';
export const GET_TEACHER = "member/GET_TEACHER";
export const GET_TEACHERS = 'member/GET_TEACHERS';

const actions = createActions({
    [GET_TEACHER]: () => {}, 
    [GET_TEACHERS]: () => {},
    [POST_LOGIN]: () => {},
    [POST_REGISTER]: () => {},
});

const memberReducer = handleActions(
    {
        [GET_TEACHER]: (state, { payload}) => {
            return payload
        },        
        [GET_TEACHERS] : (state, { payload }) => {
            return payload;
        },
        [POST_LOGIN] : (state, { payload }) => {
            return payload;
        },
        [POST_REGISTER] : (state, { payload }) =>{
            return payload;
        }
    },
    initialState 
);

export default memberReducer;