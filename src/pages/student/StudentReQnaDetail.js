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
            <div className={ StudentQnaDtailCSS.subjectSection }>
                <div className={ StudentQnaDtailCSS.subjectInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>번호</label></td>
                                <td><label>제목</label></td>
                                <td><label>작성일</label></td>
                                <td><label>작성자</label></td>
                                
                            </tr>    
                            <tr>
                            <td>
                                    <input 
                                        name='mtmCode'
                                        placeholder='번호'
                                        className={ StudentQnaDtailCSS.subjectInfoInput }
                                        value={ (qna.reList?.reCode) || '' }
                                        readOnly={ true }
                                    />
                                </td>
                                <td>
                                    <input 
                                        name='mtmTitle'
                                        placeholder='제목'
                                        className={ StudentQnaDtailCSS.subjectInfoInput }
                                        readOnly={ true }
                                        value={ (qna.reList?.reTitle) || '' }

                                    />
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="mtmDate"  
                                            placeholder='작성일'
                                            className={ StudentQnaDtailCSS.subjectInfoInput }
                                            value={ (qna.reList?.reDate?.split("00:00:00",1)) || '' }
                                            readOnly={ true }
                                            /> 
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="memberName"  
                                            placeholder='작성자'
                                            className={ StudentQnaDtailCSS.subjectInfoInput }
                                            value={ (qna.reList?.member.memberName) || '' }
                                            readOnly={ true }
                                            
                                            /> 
                                    </label>
                                </td>
                            </tr>    
                            <tr>
                                <td colSpan={4}><label>내용</label></td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    <label>
                                        <textarea
                                            name="mtmDescription"  
                                            placeholder='내용'
                                            className={ StudentQnaDtailCSS.subjectContentInput }
                                            value={ ( qna.reList?.reContent) || '' }
                                            readOnly={ true }
                                            
                                            /> 
                                    </label>
                                </td>
                            </tr>    
                        </tbody>                        
                    </table>
                </div>
            </div>
            <div>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
            </div>        
        </div>
    </>
    );

}

export default StudentReQnaDetail;