import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { callQnaDetailAPI } from "../../api/StudentAPICalls";
import StudentQnaDtailCSS from './StudentQnaDetail.module.css';
import {callQnaUpdateAPI} from "../../api/StudentAPICalls";
import { callStudentQnaDeleteAPI} from "../../api/StudentAPICalls";
function StudentReQnaDetail() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const qna = useSelector(state => state.studentQnaReducer);
    const mtmCode = params.mtmCode;
    const [form, setForm] = useState({

    });
    

    useEffect(
        () => {
            console.log('[QnaReDetail] MtmCode : ', params.mtmCode);
        
            dispatch(callQnaDetailAPI({
                mtmCode: params.mtmCode,
            }));
        }
        ,[]
    );
    console.log('[QnaReDetail] qna : ', qna);

 

    

    return(

        <>
        <div>
          <div className={ StudentQnaDtailCSS.h2 }> <h2>답변 상세조회</h2>
          </div>
            <div className={ StudentQnaDtailCSS.qnaDetailtableDiv }>
              
                <div className={ StudentQnaDtailCSS.qnaTableDiv }>
                    
                    <table className={ StudentQnaDtailCSS.qnaDetailtableCss }>
     
                    <div className={StudentQnaDtailCSS.qnaInputDiv}>
              
                            <tr>
                                <td>
                                    <input
                                      
                                        name= 'reCode'
                                        readOnly={true}
                                    
                                        value={ qna.reList?.reCode  || ''}
                                    />
                                </td>
                                 <td>
                                        <input 
                                            name= 'reTitle'
                                            readOnly={true}
                                           
                                            value={ qna.reList?.reTitle ||''}
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
                                            value={ qna && qna.reList?.reDate?.split("T",1) || ''}
                                    />
                                </td>
                             </tr>
                             </div>
                                   
                                        <textarea
                                            name='reContent'
                                            readOnly={true}
                                            value={ qna.reList?.reContent|| ''}
                                            className = { StudentQnaDtailCSS.contentTextArea }
                                        >                                    
                                        </textarea>
                                   
                           
                        </table>
                        
                    </div>
                </div>
                </div>
                <div className={ StudentQnaDtailCSS.buttonDivCsss} >                
                <button        
                    className={StudentQnaDtailCSS.backBtns}
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
            </div>        
            
    </>
    );

}

export default StudentReQnaDetail;