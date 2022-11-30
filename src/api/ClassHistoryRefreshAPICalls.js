import { GET_CLASS_HISTORY_REFRESH } from "../modules/ClassHistoryRefreshModule";

export const callStudentManagerDetailAPI = ({memberCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/student-manager/${memberCode}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        if(result.status === 200) {
            console.log('[ClassHistoryRefreshAPICalls] callStudentManagerDetailAPI RESULT : ', result);
            dispatch({ type: GET_CLASS_HISTORY_REFRESH, payload : result.data });
        }
    }
}













