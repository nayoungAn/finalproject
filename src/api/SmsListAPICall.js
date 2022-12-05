import { GET_SMS, PUT_SMS } from "../modules/SmsListModule";

// 조회
export const callSearchListForAdminAPI = (search) => {
  console.log(search);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/sms?search=${search}`;

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
      console.log("[SmsAPIcalls] callSmsAPI RESULT : ", result);
      dispatch({ type: GET_SMS, payload: result.data });
    }
  };
};

// 전송?
export const callSmsTransmissionAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/sms`;

  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
      }
    })
    .then((response) => response.json());

    if (result.status === 200) {
      console.log('[SmsAPIcalls] callSmsTransmissionAPI result : ', result);
      dispatch({ type: PUT_SMS, payload: result.data });
    }
  }
}