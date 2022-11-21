import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_LOGIN = "member/POST_LOGIN";
export const POST_REGISTER = 'member/POST_REGISTER';
export const GET_MEMBER = "member/GET_MEMBER";

const actions = createActions({
    [GET_MEMBER]: () => {}, 
    [POST_LOGIN]: () => {},
    [POST_REGISTER]: () => {},
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
        }
    },
    initialState 
);

export default memberReducer;