import { GET_CLASS_HISTORY, PUT_CLASS_HISTORY, POST_CLASS_HISTORY } from "../modules/ClassHistoryModule";

import { callStudentManagerDetailAPI } from "./ClassHistoryRefreshAPICalls";

export const callClassHistoryDetailAPI = ({classHistoryCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classesHistory/${classHistoryCode}`;
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
            console.log('[ClassHistoryRefreshAPICalls] callClassHistoryDetailAPI RESULT : ', result);
            dispatch({ type: GET_CLASS_HISTORY, payload : result.data });
        }
    }
}



export const callClassHistoryRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classesHistory`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },                     
                body : JSON.stringify({
                    openClasses :  {
                        classCode : form.classCode
                    },
                    member :  {
                        memberCode : form.memberCode
                    },
                    startDate : form.starDate
                })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ClassHistoryAPICalls] callClassHistoryRegistAPI result : ', result);
            dispatch({ type: POST_CLASS_HISTORY, payload: result.data });

          /* 수강 이력 리로드 */
            dispatch(
                callStudentManagerDetailAPI ({
                  memberCode : form.memberCode      
                }));
        }
    }

}


export const callClassHistoryUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classesHistory`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body : JSON.stringify({
                classHistoryCode : form.classHistoryCode,
                openClasses :  {
                    classCode : form.classCode
                },
                classStatus : form.classStatus,
                startDate : form.startDate
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[SubjectAPIcalls] callSubjectUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_CLASS_HISTORY, payload : result.data });
       
            /* 수강 이력 리로드 */
            dispatch(
                callStudentManagerDetailAPI ({
                  memberCode : form.memberCode      
                }));
        }
    }
}















