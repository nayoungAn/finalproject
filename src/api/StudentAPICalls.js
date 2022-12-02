
import { GET_STUDENTQNA, GET_STUDENTSQNA, PUT_STUDENTQNA, POST_STUDENTQNA, DELETE_STUDENTQNA} from "../modules/StudentQnaModule";

import { GET_QNALIST, GET_QNALISTS} from "../modules/StudentQnaListModule";

import { GET_STUDENTCLASS, GET_STUDENTSCLASS } from "../modules/StudentClassesModule";

import { GET_STUDENTMYINFO, PUT_STUDENTMYINFO, POST_STUDENTMYINFO} from "../modules/StudentMyInfoModule";

export const callQnaListAPI = ({searchvalue, currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/memberclass/qna/search?search=${searchvalue}&page=${currentPage}`;

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
            console.log('[StudentAPICalls] callQnaListAPI result : ', result);

            dispatch({ type: GET_STUDENTSQNA, payload: result.data });
        }
    }
}

export const callClassHistoryListForMemberNoPagingAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classeshistory-nopaging`;

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
            console.log('[StudentAPICalls] callClassHistoryListForMemberNoPagingAPI result : ', result);
            dispatch({ type: GET_QNALIST, payload: result.data });
        }
    }

}

export const callQnaDetailAPI = ({mtmCode}) => {
    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/memberclass/qnadetail/${mtmCode}`;
    
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
            console.log('[StudentAPICalls] callQnaDetailAPI result : ', result);

            dispatch({ type: GET_STUDENTQNA, payload: result.data });
        }
    }

}

export const callQnaUpdateAPI = ({form}) => {
    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/memberclass/qna`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")

            },
            body : JSON.stringify({
               
                mtmCode : form.mtmCode,
                mtmDate : form.mtmDate,
                mtmTitle : form.mtmTitle,
                mtmDescription : form.mtmDescription,
                answerCode : form.answerCode,
                mtmDelete : form.mtmDelete,
            })
        })
        .then(response => response.json());

        if(result.status === 200){
            console.log('[StudentAPICalls] callQnaUpdateAPI result : ', result);
            dispatch({ type: PUT_STUDENTQNA, payload: result.data });
        }
    }

}

export const callQnaRegsistAPI = ({form}) => {

    const requestURL =  `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/memberclass/qna`;

    return async (dispatch, getState ) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")

            },
            body : JSON.stringify({
                classes : {
                    classCode : form.classCode
                },
                mtmTitle : form.mtmTitle,
                mtmDescription : form.mtmDescription,
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[StudentAPICalls] callQnaRegsistAPI result : ', result);
            dispatch({ type: POST_STUDENTQNA, payload: result.data });
        }

    }

}

export const callStudentQnaDeleteAPI = ({mtmCode}) =>{
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/memberclass/qna/qnaRequest/${mtmCode}`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")

            },
        })
        .then(response => response.json());

        if(result.status === 200){
            console.log('[QnaAPICalls] callQnaUpdateAPI result : ', result);
            dispatch({ type: DELETE_STUDENTQNA, payload: result.data });
        }
    }
}
// 내강의 조회(원생)
export const callStudentClassesListAPI = ({currentPage = 1}) => {

    const requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/memberclass?page=${currentPage}`

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
            console.log('[StudentAPICalls] callStudentClassesListAPI RESULT :', result);
            dispatch({ type: GET_STUDENTCLASS, payload: result.data });
        }
        
    }
}


// 내강의 상세조회(원생)
export const callstudentClassesDetailAPI =({classCode})=> {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/memberclass/${classCode}`;

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
            console.log('[StudentAPICalls] callstudentClasssDetailAPI RESULT :', result);
            dispatch({type: GET_STUDENTSCLASS, payload: result.data });
        }

    }
    
}

export const callStudentDetailAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/memberinfo`;

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
            console.log('[StudentAPICalls] callStudentDetailAPI RESULT : ', result);
            dispatch({ type: GET_STUDENTMYINFO, payload : result.data });
        }
    }
}

export const callStudentUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/memberinfoUpdate`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[StudentAPICalls] callStudentUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_STUDENTMYINFO, payload : result.data });
        }
    }
   
}
