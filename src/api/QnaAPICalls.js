import { GET_QNAS } from "../modules/QnaListModule";
import { GET_QNA, POST_QNA ,PUT_QNA, DELETE_QNA } from "../modules/QnaModule";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom"

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
            console.log('[QnaAPICalls] callQnaListAPI result.data : ', result.data);

            dispatch({ type: GET_QNA, payload: result.data });
        }
    }

}

export const callQnaReDetailAPI = ({reCode}) => {
    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/myclass/re/classes/${reCode}`;
    
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
            console.log('[QnaAPICalls] callQnaListAPI result.data : ', result.data);

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
                reTitle : form.reTitle,
                reContent :form.reContent, 
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[QnaAPICalls] callQnaResistAPI result.data : ', result.data);
            dispatch({ type: POST_QNA, payload: result.data });
            swal.fire({
                title: "답글 등록", 
                text: `정상적으로 등록되었습니다.`,
                icon: "success",
                confirmButtonText: "확인",
                
            })
        } else{
            swal.fire({
                title: "등록 실패",
                text: '등록에 실패하였습니다.',
                icon: "error"
            });
        
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
                reCode : form.reCode,
                reTitle : form.reTitle,
                reContent : form.reContent,

            })
        })
        .then(response => response.json());

        if(result.status === 200){
            console.log('[QnaAPICalls] callQnaUpdateAPI result.data : ', result.data);
            dispatch({ type: PUT_QNA, payload: result.data });
            swal.fire({
                title: "답글 수정", 
                text: `정상적으로 수정되었습니다.`,
                icon: "success",
                confirmButtonText: "확인",
                
            })
            } else{
            swal.fire({
                title: "수정 실패",
                text: '수정에 실패하였습니다.',
                icon: "error"
            });
        
        }
    }

}

export const callQnaDeleteAPI = ({reCode}) =>{
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/ono/myclass/qnaReply/${reCode}`

   
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
            console.log('[QnaAPICalls] callQnaUpdateAPI result.data : ', result.data);
            dispatch({ type: DELETE_QNA, payload: result.data });
            swal.fire({
                title: "답글 삭제", 
                text: `답글을 삭제하시겠습니까?`,
                icon: "success",
                confirmButtonText: "확인",
                cancelButtonText: '취소',
                
            })
            .then(() => {
            })
        } else{
            swal.fire({
                title: "삭제 실패",
                text: '삭제 실패, 다시 시도하세요',
                icon: "error"
            });
        
        }
    }
}