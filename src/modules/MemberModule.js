import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_LOGIN = 'member/POST_LOGIN';
export const POST_REGISTER = 'member/POST_REGISTER';
export const GET_MEMBER = 'member/GET_MEMBER';
export const POST_FIND_ID = 'member/POST_FIND_ID';
export const POST_TEMPORARY_PWD = 'member/POST_TEMPORARY_PWD';

const actions = createActions({
    [GET_MEMBER]: () => {}, 
    [POST_LOGIN]: () => {},
    [POST_REGISTER]: () => {},
    [POST_FIND_ID]: () => {},
    [POST_TEMPORARY_PWD]: () => {},
});

const memberReducer = handleActions(
    {
        [GET_MEMBER]: (state, { payload}) => {
            return payload
        },        
        [POST_LOGIN] : (state, { payload }) => {
            return payload;
        },
        [POST_REGISTER] : (state, { payload }) =>{
            return payload;
        },
        [POST_FIND_ID] : (state, { payload }) =>{
            return payload;
        },
        [POST_TEMPORARY_PWD] : (state, { payload }) =>{
            return payload;
        }
    },
    initialState 
);

export default memberReducer;