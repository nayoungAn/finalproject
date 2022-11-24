import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_QNAS = "teacher/GET_QNAS";
export const GET_QNA = "teacher/GET_QNA";

const actions = createActions({
    [GET_QNAS]: () => {},
    [GET_QNA]: () => {}
});

const QnaListReducer = handleActions(
    {
        [GET_QNAS]: (state, { payload}) => {
            return payload
        }
    },
    {
        [GET_QNA]: (state, { payload}) => {
            return payload
        }
    },
    initialState
);


export default QnaListReducer;