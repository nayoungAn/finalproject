import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_QNA = "teacher/GET_QNA";
export const POST_QNA = "teacher/POST_QNA";
export const PUT_QNA = "teacher/PUT_QNA";
export const DELETE_QNA = "teacher/DELETE_QNA";

const actions = createActions({
    [GET_QNA]: () => {},
    [POST_QNA]: () => {},
    [PUT_QNA]: () => {},
    [DELETE_QNA]: () => {},
});

const qnaReducer = handleActions(
    
    {
        [GET_QNA]: (state, { payload}) => {
            return payload
        }
    },
    {
        [POST_QNA]: (state, { payload}) => {
            return payload
        }
    },
    {
        [PUT_QNA]: (state, { payload}) => {
            return payload
        }
    },
    {
        [DELETE_QNA]: (state, { payload}) => {
            return payload
        }
    },
    initialState
);


export default qnaReducer;