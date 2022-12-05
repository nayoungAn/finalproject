import {POST_ATTACH} from "../modules/AttachModule";


//첨부파일 등록
export const callAttachRegistAPI =({form}) => {
    
    const requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/myclass/attach`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL,{

            method : "POST",
            headers : {
            
            "Accept":"*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        },
        body : form

        })
        .then(response=> response.json());

        if(result.status === 200){
            console.log('[AttachAPICall] callAttachAPI RESULT :', result);
            dispatch({ type: POST_ATTACH, payload: result.data });
        }
        
    }
}

    