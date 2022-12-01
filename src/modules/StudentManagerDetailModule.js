import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_CLASS = "student/GET_CLASS";


const actions = createActions({
    [GET_CLASS]: () => {}
});

/* 리듀서 */
const studentManagerDetailReducer = handleActions(
    {
        [GET_CLASS] : (state, { payload }) => {
            return payload;
        }

    },
    initialState
);

export default studentManagerDetailReducer;