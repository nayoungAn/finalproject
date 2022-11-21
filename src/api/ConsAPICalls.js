import { GET_CON, GET_CONS, POST_CONS, PUT_CONS, DELETE_CONS } from "../modules/ConsModule";

export const callConsListAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/cons?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ConsAPICalls] callConsListAPI result : ', result);
            dispatch({ type: GET_CONS, payload: result.data });
        }
    }

}

export const callConsDetailAPI = ({consCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/cons/${consCode}`;

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
            console.log('[ConsAPICalls] callConsDetailAPI RESULT : ', result);
            dispatch({ type: GET_CON, payload : result.data });
        }
    }
}