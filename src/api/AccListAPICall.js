import { GET_ACC, GET_ACCS } from "../modules/AccListModule";

export const callSearchListForAdminAPI = ({search, currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/acc/search?search=${search}&page=${currentPage}`

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
            console.log('[AccAPIcalls] callSearchListForAdminAPI RESULT : ', result);
            dispatch({ type: GET_ACCS, payload : result.data });
        }
    }
}


export const callAccListForAdminAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/acc/acc-management?page=${currentPage}`;

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
            console.log('[AccAPIcalls] callAccListForAdminAPI result : ', result);
            dispatch({ type: GET_ACC, payload: result.data });
        }
    }

}

export const callAccDetailForAdminAPI = ({accCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/acc/acc-management/${accCode}`;

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
            console.log('[AccAPIcalls] callAccDetailForAdminAPI RESULT : ', result);
            dispatch({ type: GET_ACC, payload : result.data });
        }
    }
}















