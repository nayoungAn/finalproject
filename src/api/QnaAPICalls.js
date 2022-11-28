import { GET_QNAS } from "../modules/QnaListModule";
import { GET_QNA, POST_QNA ,PUT_QNA, DELETE_QNA } from "../modules/QnaModule";

export const callQnaListAPI = ({classCode, currentPage}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/myclass/qna/${classCode}?page=${currentPage}`;

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

            dispatch({ type: GET_QNAS, payload: result.data });
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

            dispatch({ type: GET_QNA, payload: result.data });
        }
    }

}

export const callQnaResistAPI = ({form}) => {

    const requestURL =  `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/myclass/qnaReply`;

    return async (dispatch, getState ) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")

            },
            body : JSON.stringify({
                mtmCode : form.mtmCode,
                classes : {
                    classCode : form.classCode
                },
                mtmTitle : form.mtmTitle,
                mtmDescription : form.mtmDescription,
                mtmRefer : form.mtmRefer,
                answerCode : form.mtmfer,
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[QnaAPICalls] callQnaResistAPI result : ', result);
            dispatch({ type: POST_QNA, payload: result.data });
        }

    }

}

export const callQnaUpdateAPI = ({form}) => {
    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/myclass/qnaReply`

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
                mtmTitle : form.mtmTitle,
                mtmDescription : form.mtmDescription,

            })
        })
        .then(response => response.json());

        if(result.status === 200){
            console.log('[QnaAPICalls] callQnaUpdateAPI result : ', result);
            dispatch({ type: PUT_QNA, payload: result.data });
        }
    }

}

export const callQnaDeleteAPI = ({mtmCode}) =>{
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/myclass/qnaReply/${mtmCode}`

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
            dispatch({ type: DELETE_QNA, payload: result.data });
        }
    }
}