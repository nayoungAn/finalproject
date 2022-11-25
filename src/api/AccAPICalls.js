import {POST_ACC, PUT_ACC } from "../modules/AccModule";

export const callAccRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/acc`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AccAPIcalls] callAccRegistAPI result : ', result);
            dispatch({ type: POST_ACC, payload: result.data });
        }
    }

}


export const callAccUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/acc`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AccAPIcalls] callAccUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_ACC, payload : result.data });
        }
    }
}
















