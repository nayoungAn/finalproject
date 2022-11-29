import { GET_CLASSHISTORY, POST_CLASSHISTORY } from "../modules/ClassHistoryModule";

export const callStudentManagerDetailAPI = ({memberCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/student-manager/${memberCode}`;
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
            console.log('[ClassHistoryAPICalls] callStudentManagerDetailAPI RESULT : ', result);
            dispatch({ type: GET_CLASSHISTORY, payload : result.data });
        }
    }
}


export const callClassHistoryRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classesHistory`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ClassHistoryAPICalls] callClassHistoryRegistAPI result : ', result);
            dispatch({ type: POST_CLASSHISTORY, payload: result.data });
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















