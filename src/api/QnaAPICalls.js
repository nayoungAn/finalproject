import { GET_QNA, GET_QNAS} from "../modules/QnaListModule";

export const callQnaListAPI = ({classCode, currentPage}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/myclass/qna/${classCode}?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result =  await fetch(requestURL, {
            method : "GET",
            headers : {
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
    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/qna/${mtmCode}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*"
            },
         
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[QnaAPICalls] callQnaListAPI result : ', result);

            dispatch({ type: GET_QNA, payload: result });
        }
    }

}