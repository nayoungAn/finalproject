import { GET_NOTICE, GET_NOTICELIST, PUT_NOTICE ,DELETE_NOTICE } from "../modules/NoticeModule";

//로그인
export const callNoticeListAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/notice?page=${currentPage}`;

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
            console.log('[NoticeAPICalls] callNoticeListAPI result : ', result);
            dispatch({ type: GET_NOTICELIST, payload: result.data });
        }
    }

}

export const callNoticeUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/notice`;

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
            console.log('[NoticeAPIcalls] callSubjectUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_NOTICE, payload : result.data });
        }
    }
}

export const callNoticeDetailAPI = ({noticeCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/notice/${noticeCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[NoticeAPICalls] callNoticeDetailAPI RESULT : ', result);
            dispatch({ type: GET_NOTICE, payload : result.data });
        }
    }
}

export const callNoticeDeleteAPI = ({noticeCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/notice/${noticeCode}`;

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
            console.log('[NoticeAPIcalls] callSubjectDeleteAPI RESULT : ', result);
            dispatch({ type: DELETE_NOTICE, payload : result.data });
        }
    }
}