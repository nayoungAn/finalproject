import { GET_CON, GET_CONS, POST_CONS, PUT_CONS, DELETE_CONS } from "../modules/ConsModule";

export const callConsListAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/cons?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                
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

export const callConsUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/cons`;

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
            console.log('[ConsAPICalls] callConsUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_CONS, payload : result.data });
        }
    }
}
export const callConsDeleteAPI = ({consCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/cons/${consCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "DELETE",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[SubjectAPIcalls] callSubjectDeleteAPI RESULT : ', result);
            dispatch({ type: DELETE_CONS, payload : result});
        }
    }
}

export const callConsRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/cons`;

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
            console.log('[SubjectAPIcalls] callSubjectRegistAPI result : ', result);
            dispatch({ type: POST_CONS, payload: result.data });
        }
    }

}
