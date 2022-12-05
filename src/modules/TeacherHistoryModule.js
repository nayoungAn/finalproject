import { createActions, handleActions } from "redux-actions";
/*초기값*/
const initialState = [];

export const GET_TEACHER_HISTORY = "classes/GET_TEACHER_HISTORY";

/*액션*/
const actions= createActions({
    [GET_TEACHER_HISTORY]: () => {}
});

/*리듀서*/
const  teacherHistoryReducer= handleActions(
    {
        [GET_TEACHER_HISTORY]: (state, {payload}) =>{
            return payload;
        },

    },
    initialState
);

export default teacherHistoryReducer;
