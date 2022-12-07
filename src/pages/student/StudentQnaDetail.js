import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { callQnaDetailAPI } from "../../api/StudentAPICalls";
import StudentQnaDtailCSS from './StudentQnaDetail.module.css';
import {callQnaUpdateAPI} from "../../api/StudentAPICalls";
import { callStudentQnaDeleteAPI} from "../../api/StudentAPICalls";
function StudentQnaDetail() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const qna = useSelector(state => state.studentQnaReducer);
    const mtmCode = params.mtmCode;
    const [form, setForm] = useState({

    });
    
    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);
    
    useEffect(
        () => {
            console.log('[QnaDetail] MtmCode : ', params.mtmCode);
        
            dispatch(callQnaDetailAPI({
                mtmCode: params.mtmCode,
            }));
        }
        ,[]
    );
    console.log('[QnaDetail] qna : ', qna);

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    /* 수정 모드 변경 이벤트 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            mtmCode : qna.mtmCode,
            classCode : qna.classes.classCode,
            memberCode : qna.member.memberCode,
            mtmTitle : qna.mtmTitle,
            mtmDate : qna.mtmDate,
            mtmDescription : qna.mtmDescription,
            answerCode : qna.answerCode,
            mtmDelete : qna.mtmDelete
           
        });
        console.log('[QnaDetail] mtmCode : ',qna.mtmCode);
        console.log('[QnaDetail] mtmDate : ',qna.mtmDate);
        console.log('[QnaDetail] answerCode : ',qna.answerCode);
        console.log('[QnaDetail] mtmDelete : ',qna.mtmDelete);
        //console.log(qna.mtmDate);
        
    }

    /* 수정 버튼 */
    const onClickStudentQnaUpdateHandler = () => {

        const formData = new FormData();

        formData.append("mtmCode", form.mtmCode);
        formData.append("classCode", form.classCode);
        formData.append("memberCode", form.memberCode);
        formData.append("mtmTitle", form.mtmTitle);
        formData.append("mtmDescription", form.mtmDescription);
        formData.append("mtmDate", form.mtmDate);
        formData.append("answerCode", form.answerCode);
        formData.append("mtmDelete", form.mtmDelete);
        
        //formData.append("memberName", form.memberName);
        
        dispatch(callQnaUpdateAPI({
            form : form
        }));
        alert('1:1상담 내역이 수정되었습니다.');
        navigate('/ono/student/studentQna', { replace : true });
    }

    //상담내역 삭제
    const onClickDeleteHandler = () => {

        dispatch(callStudentQnaDeleteAPI({
            mtmCode : mtmCode
        }));
        
        alert('상담내역이 삭제 되었습니다.');  

        navigate(`/ono/student/studentQna`, { replace : false }); 
}
    

    return(

        <>
          { qna &&
            <div> 
            <div className={ StudentQnaDtailCSS.h2 }> <h2>상담 상세조회 </h2></div>
            <div className={ StudentQnaDtailCSS.qnaDetailtableDiv }>
              
                <div className={ StudentQnaDtailCSS.qnaTableDiv }>
                    
                    <table className={ StudentQnaDtailCSS.qnaDetailtableCss }>
     
                    <div className={StudentQnaDtailCSS.qnaInputDiv}>
              
                            <tr>
                                <td>
                                    <input
                                      
                                        name= 'mtmCode'
                                        readOnly={modifyMode ? false : true}
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? qna.mtmCode : form.mtmCode) || ''}
                                    />
                                </td>
                                 <td>
                                        <input 
                                            name= 'mtmTitle'
                                            readOnly={modifyMode ? false : true}
                                            onChange={ onChangeHandler }
                                            value={ (!modifyMode ? qna.mtmTitle : form.mtmTitle) || ''}
                                    />
                                </td>
                          
                                 <td>
                                    <input 
                                            placeholder='작성자'
                                            readOnly={true}
                                            value={ qna && qna.member?.memberName || ''}
                                    />
                                </td>
                                <td>
                                        <input 
                                            placeholder='작성일'
                                            readOnly={true}
                                            value={ qna && qna.mtmDate?.split("T",1) || ''}
                                    />
                                </td>
                             </tr>
                             </div>
                                   
                                        <textarea
                                            name='mtmDescription'
                                            readOnly={modifyMode ? false : true}
                                            onChange={ onChangeHandler }
                                            value={ (!modifyMode ? qna.mtmDescription : form.mtmDescription) || ''}
                                            className = { StudentQnaDtailCSS.contentTextArea }
                                        >                                    
                                        </textarea>
                                   
                           
                        </table>
                        
                    </div>
                </div>
                </div>
                }
                {  qna &&
                    <div className={ StudentQnaDtailCSS.buttonDivCss} >
                        
                           
                            
                                {!modifyMode &&
                                  <button
                                    className={ StudentQnaDtailCSS.registBtn }
                                    onClick={ onClickModifyModeHandler }
                                  >
                                    수정모드
                                  </button>
                                }
                                
                                {modifyMode &&
                                    <button
                                        className={ StudentQnaDtailCSS.registBtn }
                                        onClick={ onClickStudentQnaUpdateHandler }
                                    >
                                        저장
                                    </button>
                                }
                                    <button
                                        className={ StudentQnaDtailCSS.backBtn }
                                        onClick={ () => navigate(-1) }
                                    >
                                        돌아가기
                                    </button>
                                {modifyMode &&
                                    <button
                                        className={ StudentQnaDtailCSS.deleteBtn }
                                        onClick={ onClickDeleteHandler }
                                    >
                                        삭제
                                    </button>   
                                }
                          
                            
                 
                        
                    </div>
                    

                }   
               
        </>
    );
}

export default StudentQnaDetail;