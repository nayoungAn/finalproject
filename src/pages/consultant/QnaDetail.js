import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callQnaDetailAPI } from "../../api/QnaAPICalls";
import { decodeJwt } from '../../utils/tokenUtils';
import QnaDetailCSS from "./QnaDetail.module.css";
function QnaDetail() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const mtmCode = params.mtmCode;
    const qnaDetail = useSelector(state => state.qnaReducer);
 
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  
    

    //상담 글 상세 조회
    useEffect(
        () => {
            console.log('[QnaDetail] MtmCode : ', params.mtmCode);
            dispatch(callQnaDetailAPI({
                mtmCode: mtmCode
            }));
        }
        ,[]
    );

    console.log('[QnaDetail] qna : ', qnaDetail);

    //답글 등록    
    const onClickHandler = () => {
        if(qnaDetail.answerCode === 1){
                alert('답변 완료 된 상담 글입니다.');
                navigate(-1);
        }else {
                navigate(`/ono/tea/qnaReply`, { replace : false });
                }
           
        }

    
    console.log("로그인 멤버 코드", qnaDetail.member?.memberName )
    console.log("토큰", token.sub)
    return(

        <>
            { qnaDetail &&
                <div className = { QnaDetailCSS.qnaDetailtableDiv }>
                    <div className= { QnaDetailCSS.qnaTableDiv}>
                     <table className={ QnaDetailCSS.qnaDetailtableCss }>
                        <colgroup>
                            <col width="20%" />
                            <col width="80%" />
                        </colgroup>
                        <tbody>
                            <div className={QnaDetailCSS.qnaInputDiv}>
                            <tr>
                                <td> 
                                    <input 
                                        name= 'mtmCode'
                                        value={ qnaDetail.mtmCode }
                                   />
                                  
                                </td>
                            </tr>    
                            <tr>
                                <td> 
                                    <input 
                                        name= 'mtmTitle'
                                        value={ qnaDetail.mtmTitle }
                                   />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input 
                                        name= 'memberName'
                                        value={ qnaDetail.member?.memberName }
                                   />
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                
                                    <input 
                                        name= 'mtmDate'
                                        value={ qnaDetail.mtmDate?.split("T",1) }
                                   />
                                </td>
                            </tr>
                            </div>
                                    <textarea
                                        name='mtmDescription'
                                        className={ QnaDetailCSS.contentTextArea }
                                        value={ qnaDetail.mtmDescription} 
                                    >                                    
                                    </textarea>
                        </tbody> 
                    </table>
                    </div>
                </div>
                }
                 <div className={ QnaDetailCSS.buttonDivCss} >
               
                 <button
                className={ QnaDetailCSS.QnaBtn}
                onClick={ onClickHandler }
                 >
                    답글 등록
                 </button> 
                
                        <button
                            className={ QnaDetailCSS.backBtn }
                            onClick={ () => navigate(-1) }
                        >
                            돌아가기
                        </button>
                  
                 </div>  
        </>
    )

}

export default QnaDetail;