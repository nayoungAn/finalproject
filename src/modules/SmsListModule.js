import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SMS = "sms/GET_SMS";
export const POST_SMS = 'sms/POST_SMS';

const actions = createActions({
  [GET_SMS]: () => {},
  [POST_SMS]: () => {},
});

/* 리듀서 */
const smsListReducer = handleActions(
  {
    [GET_SMS]: (state, { payload }) => {
      state = payload.map((item) => {
        const list = {
          memberCode: item.member.memberCode,
          memberName: item.member.memberName,
          memberPhone: item.member.memberPhone,
          className: item.openClasses.className,
          isChecked: false
        }
        return list
      })
      console.log(state);
      return state
    },
    [POST_SMS] : (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default smsListReducer;