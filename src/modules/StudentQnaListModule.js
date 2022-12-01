import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_QNALIST = "student/GET_QNALIST";
export const GET_QNALISTS = "student/GET_QNALISTS";

const actions = createActions({
  [GET_QNALIST]: () => {},
  [GET_QNALISTS]: () => {},
});

/* 리듀서 */
const studentQnaListReducer = handleActions(
  {
    [GET_QNALIST]: (state, { payload }) => {
      return payload;
    },
    [GET_QNALISTS]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default studentQnaListReducer;
