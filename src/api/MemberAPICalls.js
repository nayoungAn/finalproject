import { POST_LOGIN, POST_REGISTER} from "../modules/MemberMoudule";



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