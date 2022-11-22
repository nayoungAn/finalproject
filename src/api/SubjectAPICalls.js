import { GET_SUBJECT, GET_SUBJECTS, POST_SUBJECT, PUT_SUBJECT, DELETE_SUBJECT } from "../modules/SubjectModule";

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

export const callSubjectRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/subjects`;

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
            dispatch({ type: POST_SUBJECT, payload: result.data });
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

export const callSubjectUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/subjects`;

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
            console.log('[SubjectAPIcalls] callSubjectUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_SUBJECT, payload : result.data });
        }
    }
}

export const callSubjectDeleteAPI = ({subjectCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/subjects/${subjectCode}`;

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
            dispatch({ type: DELETE_SUBJECT, payload : result.data });
        }
    }
}















