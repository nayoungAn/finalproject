import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callQnaReDetailAPI, callQnaUpdateAPI,callQnaDeleteAPI } from "../../api/QnaAPICalls";
import QnaRegistrationCSS from './QnaRegistration.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import QnaDetailCSS from "./QnaDetail";
function QnaReDetail() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const reCode = params.reCode;
    const qnaDetail = useSelector(state => state.qnaReducer);
    const [ modifyMode, setModifyMode ] = useState(false);
    const [ form, setForm ] = useState({});
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  
    const date = qnaDetail.reDate;
    const consdate= (date||'').split(' 00:00:00',1);
    console.log("답글날짜", consdate)
    
    //답글 상세 조회
    useEffect(
        () => {
            console.log('[QnaDetail] MtmCode : ', params.reCode);
            dispatch(callQnaReDetailAPI({
                reCode : reCode
            }));
        }
        ,[]
    );


     const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }
    
    //답글 수정 
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            reCode : qnaDetail.reCode,
            reTitle : qnaDetail.reTitle,
            reContent : qnaDetail.reContent
        })
    }
    
    //답글 수정 저장
    const onClickQnaUpdateHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });

        dispatch(callQnaUpdateAPI({
            form : form
        }));
        alert('답글이 수정 되었습니다.');  
        navigate(-1);
    } 

    //답글 삭제
    const onClickDeleteHandler = () => {

            dispatch(callQnaDeleteAPI({
                reCode: reCode
            }));
            
            alert('답글이 삭제 되었습니다.');  
            navigate(-1);
    }
    
    console.log("로그인 멤버 코드", qnaDetail.member?.memberName )
    console.log("토큰", token.sub)
    return(

        <>
           
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
                                        name= 'reTitle'
                                        placeholder='제목'
                                        readOnly={modifyMode ? false : true}
                                        style={ !modifyMode ? { backgroundColor: 'white'} : null}
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? qnaDetail.reTitle : form.reTitle) || ''}
                                   />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input 
                                        className={ QnaDetailCSS.qnaDetailInput }
                                        placeholder='작성자'
                                        readOnly={true}
                                        style={  { backgroundColor: 'white'} }
                                        value={ qnaDetail && qnaDetail.member?.memberName || ''}
                                   />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input 
                                        className={ QnaDetailCSS.qnaDetailInput }
                                        placeholder='작성일'
                                        readOnly={true}
                                        style={  { backgroundColor: 'white'} }
                                        value={ qnaDetail && qnaDetail.reDate || ''}
                                   />
                                </td>
                            </tr>
                            <tr>
                                 <td colSpan={2}>
                                    <textarea
                                        name='reContent'
                                        className={ QnaDetailCSS.contentTextArea }
                                        readOnly={modifyMode ? false : true}
                                        style={ !modifyMode ? { backgroundColor: 'white'} : null}
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? qnaDetail.reContent : form.reContent) || ''}
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
                        { token &&
                            (token.sub === qnaDetail.member?.memberId)
                            ?
                           
                             <div>{!modifyMode &&
                                  <button
                                    className={ QnaDetailCSS.backBtn }
                                    onClick={ onClickModifyModeHandler }
                                  >
                                    수정모드
                                  </button>
                                }
                                {modifyMode &&
                                    <button
                                        className={ QnaDetailCSS.backBtn }
                                        onClick={ onClickQnaUpdateHandler }
                                    >
                                        답글 수정 저장
                                    </button>
                                }
                                    <button
                                        onClick={ onClickDeleteHandler }
                                    >
                                        답글 삭제
                                    </button>   
                            </div>
                          :null  
                        }
                    </div>

                }    
        </>
    )

}

export default QnaReDetail;