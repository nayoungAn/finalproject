import { POST_TEACHER_REGISTER, GET_TEACHER, GET_TEACHERS} from "../modules/TeacherMoudule";

export const callTeacherRegistAPI = ({form}) =>{

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/teachers`; 

    return async ( dispatch, getState ) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200){
            console.log('[TeacherAPICalls] callProductRegistAPI result : ', result);
            dispatch({ type: POST_TEACHER_REGISTER, payload: result.data});
        }
    }
}

export const callSearchTeacherListForAdminAPI = ({search, currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/teachers/search?search=${search}&page=${currentPage}`

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
            console.log('[MemberAPICalls] callSearchTeacherListForAdminAPI RESULT : ', result);
            dispatch({ type: GET_TEACHERS, payload : result.data });
        }
    }
}


export const callTeacherListForAdminAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/teachers-management?page=${currentPage}`;

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
            console.log('[MemberAPICalls] callTeacherListForAdminAPI result : ', result);
            dispatch({ type: GET_TEACHERS, payload: result.data });
        }
    }

}

export const callTeacherDetailForAdminAPI = ({memberCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/teachers-management/${memberCode}`;

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
            console.log('[MemberAPICalls] callTeacherDetailForAdminAPI RESULT : ', result);
            dispatch({ type: GET_TEACHER, payload : result.data });
        }
    }
}
