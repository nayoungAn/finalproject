
import { POST_TEACHER_REGISTER, PUT_TEACHER, DELETE_TEACHER} from "../modules/TeacherModule";


export const callTeacherRegistAPI = ({form}) =>{

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/teachers`; 

    return async ( dispatch, getState ) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200){

            console.log('[TeacherAPICalls] callTeacherRegistAPI result : ', result);
            dispatch({ type: POST_TEACHER_REGISTER, payload: result.data});
        }
    }
}


export const callTeacherUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/teachers`;


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
            console.log('[TeacherAPICalls] callTeacherUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_TEACHER, payload : result.data });
        }
    }
}

export const callTeacherDeleteAPI = ({memberCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/teachers/${memberCode}`;


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {

            method : "DELETE",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {

            console.log('[TeacherAPICalls] callTeacherDeleteAPI RESULT : ', result);
            dispatch({ type: DELETE_TEACHER, payload : result});

        }
    }
}
