import { GET_TEACHER, GET_TEACHERS, POST_LOGIN, POST_REGISTER} from "../modules/MemberMoudule";



//로그인
export const callLoginAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/login`;

    return async (dispatch, getState) => {


        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*"
            },
            body : JSON.stringify({
                memberId: form.memberId,
                memberPassword: form.memberPassword
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MemberAPICalls] callLoginAPI result : ', result);
            window.localStorage.setItem('accessToken', result.data.accessToken);
            dispatch({ type: POST_LOGIN, payload: result });
        }

        
    }

}

//로그아웃
export const callLogoutAPI = () => {

    return async (dispatch, getState) => {
        dispatch({ type: POST_LOGIN, payload:''});
        console.log('[MemberAPICalls] callLogoutAPI result : SUCCESS');
    }
}

//강사 등록
export const callRegisterAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/signup`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                memberId: form.memberId,
                memberPassword: form.memberPassword,
                memberName: form.memberName,
                memberPhone: form.memberPhone,
                memberBirthday: form.memberBirthday,
                memberGender: form.memberGender,
                memberAddress: form.memberAddress,
                memberStatus: form.memberStatus,
                memberEmail: form.memberEmail,
                memberImage: form.memberImage                
            })
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);

        if(result.status === 201){
            dispatch({ type: POST_REGISTER, payload: result});
        }
    };
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


