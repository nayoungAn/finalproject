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
                                        onChange={ onChangeHandler }
                                        value={ (qna.mtmCode) || '' }
                                        readOnly={ true }
                                        style={ modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                                <td>
                                    <input 
                                        name='mtmTitle'
                                        placeholder='제목'
                                        className={ StudentQnaDtailCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? qna.mtmTitle : form.mtmTitle) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="mtmDate"  
                                            placeholder='작성일'
                                            className={ StudentQnaDtailCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (qna.mtmDate?.split("T",1)) || '' }
                                            readOnly={ true }
                                            style={ modifyMode ? { backgroundColor : 'gray'} : null }
                                            /> 
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="memberName"  
                                            placeholder='작성자'
                                            className={ StudentQnaDtailCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (qna.member?.memberName) || '' }
                                            readOnly={ true }
                                            style={ modifyMode ? { backgroundColor : 'gray'} : null }
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
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? qna.mtmDescription : form.mtmDescription) || '' }
                                            readOnly={ modifyMode ? false : true }
                                            style={ modifyMode ? { backgroundColor : 'lightgray'} : null }
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
            {!modifyMode &&
                <button 
                    onClick={ onClickModifyModeHandler }
                >
                    수정 모드
                </button>
            }
            {modifyMode &&
                <button 
                    onClick={ onClickStudentQnaUpdateHandler }
                >
                    저장하기
                </button>
            }
            <button
                    onClick={ onClickDeleteHandler }
                >
                    삭제
                </button>   
            </div>        
        </div>
    </>
    );

}

export default StudentQnaDetail;