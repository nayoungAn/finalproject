import { GET_SUBJECT, GET_SUBJECTS } from "../modules/SubjectListModule";

export const callSearchListForAdminAPI = ({search, currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/subjects/search?search=${search}&page=${currentPage}`

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
            console.log('[SubjectAPIcalls] callSearchListForAdminAPI RESULT : ', result);
            dispatch({ type: GET_SUBJECTS, payload : result.data });
        }
    }
}


export const callSubjectListForAdminAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/subjects-management?page=${currentPage}`;

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
            console.log('[SubjectAPIcalls] callSubjectListForAdminAPI result : ', result);
            dispatch({ type: GET_SUBJECTS, payload: result.data });
        }
    }

}

export const callSubjectListForAdminNoPagingAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/subjects-management-nopaging`;

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
            console.log('[SubjectAPIcalls] callSubjectListForAdminAPInopaging result : ', result);
            dispatch({ type: GET_SUBJECTS, payload: result.data });
        }
    }

}

export const callSubjectDetailForAdminAPI = ({subjectCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/subjects-management/${subjectCode}`;

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
            console.log('[SubjectAPIcalls] callSubjectDetailForAdminAPI RESULT : ', result);
            dispatch({ type: GET_SUBJECT, payload : result.data });
        }
    }
}














