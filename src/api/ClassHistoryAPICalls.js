import { POST_CLASSHISTORY } from "../modules/ClassHistoryModule";
import { callStudentManagerDetailAPI } from "./ClassHistoryRefreshAPICalls";



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
            dispatch({ type: POST_CLASSHISTORY, payload: result.data });

            dispatch(
                callStudentManagerDetailAPI ({
                  memberCode : form.memberCode      
                }));
        }
    }

}


// export const callSubjectUpdateAPI = ({form}) => {

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/subjects`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method : "PUT",
//             headers : {
//                 "Accept" : "*/*",
//                 "Authorization" : "Bearer " + window.localStorage.getItem("accessToken"),
//             },
//             body : form
//         })
//         .then(response => response.json());

//         if(result.status === 200) {
//             console.log('[SubjectAPIcalls] callSubjectUpdateAPI RESULT : ', result);
//             dispatch({ type: PUT_SUBJECT, payload : result.data });
//         }
//     }
// }















