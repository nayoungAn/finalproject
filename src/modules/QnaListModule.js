import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_QNAS = "teacher/GET_QNAS";

const actions = createActions({
    [GET_QNAS]: () => {}
});

const QnaListReducer = handleActions(
    {
        [GET_QNAS]: (state, { payload}) => {
            return payload
        }
    },
   
    initialState
);


export default QnaListReducer;