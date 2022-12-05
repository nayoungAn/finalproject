import { GET_STUDENTINFO } from "../modules/StudentInfoModule";

// 원생 조회
export const callStudentInfoAPI = ({currentPage = 1}) => {

    const requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/studentinfo?page=${currentPage}`

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
            console.log('[StudentInfoAPICall] callStudentInfoAPI RESULT :', result);
            dispatch({ type: GET_STUDENTINFO, payload: result.data });
        }
        
    };
}