import { createActions, handleActions } from "redux-actions";
/*초기값*/
const initialState = [];

export const GET_STUDENTINFO = 'studentinfo/GET_STUDENTINFO';


/*액션*/
const actions= createActions({
    [GET_STUDENTINFO]: () => {}
 
});

/*리듀서*/
const  studentInfoReducer= handleActions(
    {
        [GET_STUDENTINFO]: (state,{payload}) =>{
            return payload;
        }

    },
    initialState
);

export default studentInfoReducer;