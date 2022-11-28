import { GET_ATTEND, PUT_ATTEND} from "../modules/AttendModule";

export const callAttendAPI = ({classCode, currentPage}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/myclass/attend/${classCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AttendAPI] callAttendAPI result : ', result);
            dispatch({ type: GET_ATTEND, payload: result.data });
        }
    }

}

export const callAttendUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/myclass/attend`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify({
                attendCode : form.attendCode,
                attendStatus : form.attendStatus
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AttendAPI] callAttendUpdateAPI result : ', result);
            dispatch({ type: PUT_ATTEND, payload: result.data });
        }
    }

}