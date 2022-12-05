import { GET_TEACHER_HISTORY } from "../modules/TeacherHistoryModule";

// 강사이력 조회
export const callTeacherHistoryAPI = ({memberCode}) => {

    const requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/teachersHistory-management-nopaging/${memberCode}`

    return async (dispatch, getState) => {
        const result = await fetch(requestURL,{

            method : "GET",
            headers : {
            "content-type": "application/json",
            "Accept":"*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }

        })
        .then(response=> response.json());

        if(result.status === 200){
            console.log('[TeacherHistoryAPICalls] callTeacherHistoryAPI RESULT :', result);
            dispatch({ type: GET_TEACHER_HISTORY, payload: result.data });
        }
        
    }
}

