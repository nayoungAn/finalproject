import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_ACC = 'acc/GET_ACC';
export const GET_ACCS = 'acc/GET_ACCS';

const actions = createActions({
    [GET_ACC]: () => {},
    [GET_ACCS]: () => {},
});

/* 리듀서 */
const accListReducer = handleActions(
    {
        [GET_ACC] : (state, { payload }) => {
            return payload;
        },
        [GET_ACCS] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default accListReducer;