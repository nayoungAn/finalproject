
import { GET_CHECKEMAIL } from "../modules/StudentManagerDetailModule";
import { GET_STUDENT, GET_STUDENTLIST, POST_STUDENT, PUT_STUDENT, GET_CHECKID} from "../modules/StudentManagerModule";


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
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
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

export const callSearchListAPI = ({search, currentPage = 1}) => {

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
            console.log('[StudentManagerAPICalls] callSearchListAPI RESULT : ', result);
            dispatch({ type: GET_STUDENTLIST, payload : result.data });
        }
    }
}

export const callStudentManagerRegistAPI = ({form}) =>{

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/student-manager`; 

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

            console.log('[StudentManagerAPICalls] callTeacherRegistAPI result : ', result);
            dispatch({ type: POST_STUDENT, payload: result.data});
        }
    }
}

//아이디 체크 API
export const callMemberIdCheckAPI = ({memberId}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/checkMemberId/${memberId}`;

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
            dispatch({ type: GET_CHECKID, payload: result.data });
            if(result.data === true) {
                alert("중복된 아이디입니다.");
            } else {
                alert("사용가능한 아이디입니다.")
            }
        }
    }
}

//이메일 체크 API
export const callMemberEmailCheckAPI = ({memberEmail}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/checkEmail/${memberEmail}`;

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
            dispatch({ type: GET_CHECKEMAIL, payload: result.data });
            if(result.data === true) {
                alert("중복된 이메일입니다.");
            } else {
                alert("사용가능한 이메일입니다.")
            }
        }
    }

}
