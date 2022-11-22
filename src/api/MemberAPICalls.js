import { POST_FIND_ID, POST_LOGIN, POST_REGISTER} from "../modules/MemberMoudule";
import { useNavigate } from "react-router-dom"
import swal from "sweetalert2";

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

export const callFindIdAPI = ({form}) => {

    const navigate = useNavigate;
    const requestURL = `http:////${process.env.REACT_APP_RESTAPI_IP}:8001/auth/find-id`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : "POST",
            headers :{
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                memberName: form.memberName,
                memberEmail: form.memberEmail
            }) 
        })
        .then(response => response.json());

        if(result.status === 200){
            console.log('[MemberAPICalls] callFindIdAPI result : SUCCESS');
            dispatch({type: POST_FIND_ID, payload: result.data});
            swal.fire({
                title: "아이디 찾기 완료", 
                text: `가입된 아이디는 ${result.data.memberId} 입니다.`,
                icon: "success",
                Button: "로그인으로 이동",
            })
            .then(() => {
                navigate(`/`, { replace: true});
              
             })
        } else{
            swal.fire({
                title: "아이디 찾기 실패",
                text: '입력하신 정보로 해당하는 아이디를 찾을 수 없습니다.',
                icon: "error"
            });
        }

    }

}

export const callFindPwdAPI = () => {

    const requestURL = `http:////${process.env.REACT_APP_RESTAPI_IP}:8001/auth/temporary-pwd`;
    
}