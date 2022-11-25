import { GET_SMS, GET_SMSS } from "../modules/SmsListModule";

export const callSearchListForAdminAPI = ({ search, currentPage = 1 }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/sms/search?search=${search}&page=${currentPage}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      console.log("[SmsAPIcalls] callSearchListForAdminAPI RESULT : ", result);
      dispatch({ type: GET_SMSS, payload: result.data });
    }
  };
};

export const callSmsListForAdminAPI = ({ currentPage = 1 }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/sms-management?page=${currentPage}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      console.log("[AccAPIcalls] callSmsListForAdminAPI result : ", result);
      dispatch({ type: GET_SMS, payload: result });
    }
  };
};
