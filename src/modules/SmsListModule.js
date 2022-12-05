import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SMS = "sms/GET_SMS";
export const PUT_SMS = 'sms/PUT_SMS';

const actions = createActions({
  [GET_SMS]: () => {},
  [PUT_SMS]: () => {},
});

/* 리듀서 */
const smsListReducer = handleActions(
  {
    [GET_SMS]: (state, { payload }) => {
      return payload;
    },
    [PUT_SMS] : (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default smsListReducer;