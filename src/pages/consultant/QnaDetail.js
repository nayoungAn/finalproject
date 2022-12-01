import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callQnaDetailAPI, callQnaUpdateAPI,callQnaDeleteAPI } from "../../api/QnaAPICalls";
import QnaRegistrationCSS from './QnaRegistration.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import QnaDetailCSS from "./QnaDetail";
function QnaDetail() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const mtmCode = params.mtmCode;
    const qnaDetail = useSelector(state => state.qnaReducer);
    const [ modifyMode, setModifyMode ] = useState(false);
    const [ form, setForm ] = useState({});
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
           <button
                onClick={ onClickHandler }
            >
                    답글 등록
            </button>
            { qnaDetail &&
                <div className = { QnaDetailCSS.qnaDetailtableDiv }>
                    <table className={ QnaDetailCSS.qnaDetailtableCss }>
                        <colgroup>
                            <col width="20%" />
                            <col width="80%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>
                                    <input 
                                        className={ QnaDetailCSS.qnaDetailInput }
                                        name= 'mtmTitle'
                                        placeholder='제목'
                                        value={ qnaDetail.mtmTitle }
                                   />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input 
                                        className={ QnaDetailCSS.qnaDetailInput }
                                        placeholder='작성자'
                                        value={ qnaDetail.member?.memberName }
                                   />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input 
                                        className={ QnaDetailCSS.qnaDetailInput }
                                        placeholder='작성일'
                                        value={ qnaDetail.mtmDate }
                                   />
                                </td>
                            </tr>
                            <tr>
                                 <td colSpan={2}>
                                    <textarea
                                        name='mtmDescription'
                                        className={ QnaDetailCSS.contentTextArea }
                                        value={ qnaDetail.mtmDescription} 
                                    >                                    
                                    </textarea>
                                </td>
                            </tr>
                        </tbody> 
                    </table>
                </div>
                }
                {  qnaDetail &&
                    <div className={ QnaDetailCSS.buttonDivCss} >
                        <button
                            className={ QnaDetailCSS.backBtn }
                            onClick={ () => navigate(-1) }
                        >
                            돌아가기
                        </button>
                    </div>

                }    
        </>
    )

}

export default QnaDetail;