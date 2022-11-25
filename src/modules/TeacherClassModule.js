import { createActions, handleActions } from "redux-actions";
/*초기값*/
const initialState = [];

export const GET_CLASS = "classes/GET_CLASS";
export const GET_CLASSES = 'classes/GET_CLASSES';

/*액션*/
const actions= createActions({
    [GET_CLASS]: () => {},
    [GET_CLASSES]: () => {},
});

/*리듀서*/
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
