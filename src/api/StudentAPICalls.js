
import { GET_STUDENTQNA, GET_STUDENTSQNA, PUT_STUDENTQNA, POST_STUDENTQNA, DELETE_STUDENTQNA} from "../modules/StudentQnaModule";

import { GET_STUDENTCLASS, GET_STUDENTSCLASS } from "../modules/StudentClassesModule";

export const callQnaListAPI = ({classCode, currentPage}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/student/qna/${classCode}?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result =  await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[QnaAPICalls] callQnaListAPI result : ', result);

            dispatch({ type: GET_STUDENTSQNA, payload: result.data });
        }
    }
}

export const callQnaDetailAPI = ({mtmCode}) => {
    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/myclass/qna/classes/${mtmCode}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")

            },
         
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[QnaAPICalls] callQnaListAPI result : ', result);

            dispatch({ type: GET_STUDENTQNA, payload: result.data });
        }
    }

}

export const callQnaRegsistAPI = ({form}) => {

    const requestURL =  `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/myclass/qnaReply`;

    return async (dispatch, getState ) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")

            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[QnaAPICalls] callQnaResistAPI result : ', result);
            dispatch({ type: POST_STUDENTQNA, payload: result.data });
        }

    }

}


// 내강의 조회(강사)
export const callStudentClassesListAPI = ({currentPage = 1}) => {

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
            dispatch({ type: GET_STUDENTCLASS, payload: result.data });
        }
        
    }
}


// 내강의 상세조회(강사)
export const callstudentClasssDetailAPI =({classCode})=> {

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
            dispatch({type: GET_STUDENTSCLASS, payload: result.data });
        }

    }

}