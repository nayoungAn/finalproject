import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_CLASS = "classes/GET_CLASS";
export const GET_CLASSES = 'classes/GET_CLASSES';

const actions= createActions({
    [GET_CLASS]: () => {},
    [GET_CLASSES]: () => {},
});

const  teacherClassReducer= handleActions(
    {
        [GET_CLASS]: (state,{payload}) =>{
            return payload;
        },
        [GET_CLASSES] : (state,{payload}) => {
            return payload;
        },

    },
    initialState
);

export default teacherClassReducer;
