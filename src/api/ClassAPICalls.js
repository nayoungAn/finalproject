import { GET_CLASS, GET_CLASSES, POST_CLASS, PUT_CLASS } from "../modules/ClassModule";


export const callSearchClassListAPI = ({search, currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classes/search?search=${search}&page=${currentPage}`

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
            console.log('[ClassAPICalls] callClassListAPI result : ', result);
            dispatch({ type: GET_CLASSES, payload : result.data });
        }
    }
}


export const callClassListForAdminAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classes-management?page=${currentPage}`;

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
            console.log('[ClassAPICalls] callClassListForAdminAPI result : ', result);
            dispatch({ type: GET_CLASSES, payload: result.data });
        }
    }

}

export const callClassRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classes`;

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
            console.log('[ClassAPICalls] callClassRegistAPI result : ', result);
            dispatch({ type: POST_CLASS, payload: result.data });
        }
    }

}

export const callClassDetailForAdminAPI = ({classCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classes-management/${classCode}`;

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
            console.log('[ClassAPICalls] callClassDetailForAdminAPI RESULT : ', result);
            dispatch({ type: GET_CLASS, payload : result.data });
        }
    }
}

export const callClassUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classes`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ClassAPICalls] callClassUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_CLASS, payload : result.data });
        }
    }
}
















