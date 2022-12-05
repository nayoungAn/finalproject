import {PUT_ACC } from "../modules/AccModule";

/* 수정 */
export const callAccUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/acc/acc-management`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body : JSON.stringify({
                accCode : form.accCode,
                accDate : form.accDate,
                accOption : form.accOption,
                accStatus : form.accStatus,
                accContent : form.accContent
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AccAPIcalls] callAccUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_ACC, payload : result.data });
        }
    }
}
















