import { GET_CLASS, GET_CLASSES, POST_CLASS, PUT_CLASS } from "../modules/ClassModule";


export const callSearchClassListAPI = ({search, currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classes/search?search=${search}&page=${currentPage}`

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
            console.log('[ClassAPICalls] callClassListAPI result : ', result);
            dispatch({ type: GET_CLASSES, payload : result.data });
        }
    }
}


export const callClassListForAdminAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classes-management?page=${currentPage}`;

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
            console.log('[ClassAPICalls] callClassListForAdminAPI result : ', result);
            dispatch({ type: GET_CLASSES, payload: result.data });
        }
    }

}

export const callClassListForAdminNoPagingAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classes-management-nopaging
    `;

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
            console.log('[ClassAPICalls] callClassListForAdminNoPagingAPI result : ', result);
            dispatch({ type: GET_CLASSES, payload: result.data });
        }
    }

}
export const callClassRegistAPI = ({form, classesScheduleList, subjectCode, memberCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classes`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify({
                    subject :  {
                        subjectCode : subjectCode
                    },
                    member :  {
                        memberCode : memberCode
                    },
                    className : form.className,
                    classQuota : form.classQuota,
                    classPrice : form.classPrice,
                    classStartDate : form.classStartDate,
                    classEndDate : form.classEndDate,
                    classRoom : form.classRoom,
                    classStatus :form.classStatus,
                    classCircuit : form.classCircuit,
                    classDescription : form.classDescription,
                    classStudents : form.classStudents,
                    classesScheduleList : classesScheduleList
                })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ClassAPICalls] callClassRegistAPI result : ', result);
            dispatch({ type: POST_CLASS, payload: result.data });
        }
    }

}

export const callClassDetailForAdminAPI = ({classCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classes-management/${classCode}`;

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
            console.log('[ClassAPICalls] callClassDetailForAdminAPI RESULT : ', result);
            dispatch({ type: GET_CLASS, payload : result.data });
        }
    }
}

export const callClassUpdateAPI = ({form,classesScheduleList,memberCode,subjectCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/classes`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify({
                subject :  {
                    subjectCode : subjectCode
                },
                member :  {
                    memberCode : memberCode
                },
                classCode : form.classCode,
                className : form.className,
                classQuota : form.classQuota,
                classPrice : form.classPrice,
                classStartDate : form.classStartDate.toString(),
                classEndDate : form.classEndDate.toString(),
                classRoom : form.classRoom,
                classStatus :form.classStatus,
                classCircuit : form.classCircuit,
                classDescription : form.classDescription,
                classStudents : form.classStudents,
                classesScheduleList : classesScheduleList
            })
            })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ClassAPICalls] callClassUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_CLASS, payload : result.data });
        }
    }
}















