import { GET_STUDENTDETAIL } from "../modules/StudentMangerDetailModule";


export const callStudentManagerDetailForAdminAPI = ({memberCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/student-managers/${memberCode}`;
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
            console.log('[StudentManagerAPICalls] callStudentManagerDetailForAdminAPI RESULT : ', result);
            dispatch({ type: GET_STUDENTDETAIL, payload : result.data });
        }
    }
}