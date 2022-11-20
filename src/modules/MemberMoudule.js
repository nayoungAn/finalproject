import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_LOGIN = "member/POST_LOGIN";
export const POST_REGISTER = 'member/POST_REGISTER';

const actions = createActions({
    [POST_LOGIN]: () => {},
    [POST_REGISTER]: () => {},
});

const memberReducer = handleActions(
    {

        [POST_LOGIN] : (state, { payload }) => {
            return payload;
        },
        [POST_REGISTER] : (state, { payload }) =>{

        }
    },
    initialState 
);

export default memberReducer;