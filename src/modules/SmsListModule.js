import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SMS = "acc/GET_SMS";
export const GET_SMSS = "acc/GET_SMSS";

const actions = createActions({
  [GET_SMS]: () => {},
  [GET_SMSS]: () => {},
});

/* 리듀서 */
const smsListReducer = handleActions(
  {
    [GET_SMS]: (state, { payload }) => {
      return payload;
    },
    [GET_SMSS]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default smsListReducer;
