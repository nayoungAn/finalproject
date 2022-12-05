import { GET_ACC, GET_ACCS } from "../modules/AccListModule";

/* 조회 */
export const callSearchListForAdminAPI = ({searchValue, currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/acc/acc/search?search=${searchValue}&page=${currentPage}`

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

/* 상세 조회 */
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















