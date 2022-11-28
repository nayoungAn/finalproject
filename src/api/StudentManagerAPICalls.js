import { GET_STUDENT, GET_STUDENTLIST, PUT_STUDENT } from "../modules/StudentManagerModule";
//로그인
export const callStudentManagerListAPI = ({currentPage = 1}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/student-manager?page=${currentPage}`;
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
            console.log('[StudentManagerAPICalls] callStudentManagerListAPI result : ', result);
            dispatch({ type: GET_STUDENTLIST, payload: result.data });
        }
    }
}
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
            console.log('[StudentManagerAPICalls] callStudentManagerDetailAPI RESULT : ', result);
            dispatch({ type: GET_STUDENT, payload : result.data });
        }
    }
}
export const callStudentManagerUpdateAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/student-manager`;
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
            console.log('[StudentManagerAPICalls] callStudentManagerUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_STUDENT, payload : result.data });
        }
    }
}

export const callSearchStudentListForAdminAPI = ({search, currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/student-manager/search?search=${search}&page=${currentPage}`

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
            console.log('[StudentManagerAPICalls] callSearchStudentListForAdminAPI RESULT : ', result);
            dispatch({ type: GET_STUDENTLIST, payload : result.data });
        }
    }
}
/* 페이징 없고 원생일 경우 리스트 */ 
export const callStudentManagerListNoPagingAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/students-management-nopaging`;
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
            console.log('[StudentManagerAPICalls] callStudentManagerListNoPagingAPI result : ', result);
            dispatch({ type: GET_STUDENTLIST, payload: result.data });
        }
    }
}