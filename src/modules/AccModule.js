import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_ACC = 'acc/POST_ACC';
export const PUT_ACC = 'acc/PUT_ACC';

const actions = createActions({
    [POST_ACC]: () => {},
    [PUT_ACC]: () => {}
});

/* 리듀서 */
const accReducer = handleActions(
    {
        [POST_ACC] : (state, { payload }) => {
            return payload;
        },
        [PUT_ACC] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default accReducer;