import { createActions, handleActions } from "redux-actions";

/*초기값*/
const initialState = [];

export const POST_ATTACH = "attach/POST_ATTACH";

/* 액션 */
const actions= createActions({
    [POST_ATTACH]: () => {}
});

/*리듀서*/
const attachReducer=  handleActions(
    {
        [POST_ATTACH]: (state,{payload}) =>{
            return payload;
        },
    },
    initialState
);

export default attachReducer;

