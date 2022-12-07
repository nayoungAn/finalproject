import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callQnaReDetailAPI, callQnaUpdateAPI,callQnaDeleteAPI } from "../../api/QnaAPICalls";
import { decodeJwt } from '../../utils/tokenUtils';
import QnaReDetailCSS from "./QnaReDetail.module.css";
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
       
    } 

    //답글 삭제
    const onClickDeleteHandler = () => {

            dispatch(callQnaDeleteAPI({
                reCode: reCode
            }));
            
            
    }
    
    console.log("로그인 멤버 코드", qnaDetail.member?.memberName )
    console.log("토큰", token.sub)
    return(

        <>
           
            { qnaDetail &&
                  <div className = { QnaReDetailCSS.qnaDetailtableDiv }>
                      <div className= { QnaReDetailCSS.qnaTableDiv}>
                        <table className={ QnaReDetailCSS.qnaDetailtableCss }>
                        <colgroup>
                            <col width="20%" />
                            <col width="80%" />
                        </colgroup>
                        <tbody>
                            <div className={QnaReDetailCSS.qnaInputDiv}>
                            <tr>
                                    <td>
                                        <input 
                                            name= 'reCode'
                                            readOnly={modifyMode ? false : true}
                                            onChange={ onChangeHandler }
                                            value={ (!modifyMode ? qnaDetail.reCode : form.reCode) || ''}
                                    />
                                    </td>
                            </tr>
                            <tr>
                                    <td>
                                        <input 
                                            name= 'reTitle'
                                            placeholder='제목'
                                            readOnly={modifyMode ? false : true}
                                            onChange={ onChangeHandler }
                                            value={ (!modifyMode ? qnaDetail.reTitle : form.reTitle) || ''}
                                            style={ modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                    </td>
                            </tr>
                            <tr>
                                    <td>
                                        <input 
                                            placeholder='작성자'
                                            readOnly={true}
                                            value={ qnaDetail && qnaDetail.member?.memberName || ''}
                                    />
                                    </td>
                            </tr>
                            <tr>
                                    <td>
                                        <input 
                                            placeholder='작성일'
                                            readOnly={true}
                                            value={ qnaDetail && qnaDetail.reDate || ''}
                                    />
                                    </td>
                            </tr>
                             </div>
                                   
                                        <textarea
                                            name='reContent'
                                            readOnly={modifyMode ? false : true}
                                            onChange={ onChangeHandler }
                                            value={ (!modifyMode ? qnaDetail.reContent : form.reContent) || ''}
                                            className = { QnaReDetailCSS.contentTextArea }
                                        >                                    
                                        </textarea>
                                   
                            </tbody> 
                        </table>
                    </div>
                </div>
                }
                {  qnaDetail &&
                    <div className={ QnaReDetailCSS.buttonDivCss} >
                        {!modifyMode &&
                                  <button
                                    className={ QnaReDetailCSS.registBtn }
                                    onClick={ onClickModifyModeHandler }
                                  >
                                    수정모드
                                  </button>
                                }
                                {modifyMode &&
                                    <button
                                        className={ QnaReDetailCSS.registBtn }
                                        onClick={ onClickQnaUpdateHandler }
                                    >
                                        저장
                                    </button>
                                }
                        <button
                            className={ QnaReDetailCSS.backBtn }
                            onClick={ () => navigate(-1) }
                        >
                            돌아가기
                        </button>
                        { token &&
                            (token.sub === qnaDetail.member?.memberId)
                            ?
                           
                             <div>
                                
                                {modifyMode &&
                                    <button
                                        className={ QnaReDetailCSS.deleteBtn }
                                        onClick={ onClickDeleteHandler }
                                    >
                                        삭제
                                    </button>   
                                }
                            </div>
                            
                          :null  
                        }
                    </div>
                    

                }    
        </>
    )

}

export default QnaReDetail;