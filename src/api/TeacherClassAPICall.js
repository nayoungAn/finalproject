import { GET_CLASS,GET_CLASSES } from "../modules/TeacherClassModule";

// 내강의 조회(강사)
export const callSearchTeacherClassAPI = ({currentPage = 1}) => {

    const requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/teacherclass?page=${currentPage}`

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
            console.log('[TeacherclassAPICalls] callSearchTeacherClassAPI RESULT :', result);
            dispatch({ type: GET_CLASS, payload: result.data });
        }
        
    }
}


// 내강의 상세조회(강사)
export const callteacherClasssDetailAPI =({classCode})=> {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/myclass/${classCode}`;

    return async (dispatch, getstat)=>{

        const result = await fetch(requestURL,{

            method:"GET",
            headers: {
                "Content-Type":"application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status ===200){
            console.log('[TeacherclassAPICalls] callTeacherclassDetailAPI RESULT :', result);
            dispatch({type: GET_CLASSES, payload: result.data });
        }

    }


}
