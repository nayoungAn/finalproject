import SubjectRegistrationCSS from './SubjectRegistration.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { callSubjectRegistAPI } from '../../api/SubjectAPICalls';


function SubjectRegistration(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        subjectName : '',
        subjectForm : '',
        subjectLanguage : '',
        subjectBook: '',
        subjectDescription : '',
        subjectLearningObjectives : ''
    });

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    /* 상품 등록 버튼 클릭 이벤트 */
    const onClickSubjectRegistrationHandler = () => {

        const formData = new FormData();

        formData.append("subjectName", form.subjectName);
        formData.append("subjectForm", form.subjectForm);
        formData.append("subjectLanguage", form.subjectLanguage);
        formData.append("subjectBook", form.subjectBook);
        formData.append("subjectDescription", form.subjectDescription);
        formData.append("subjectLearningObjectives", form.subjectLearningObjectives);

        dispatch(callSubjectRegistAPI({
            form : formData
        }));

        alert('과목이 등록되었습니다.');
        navigate("/ono/OpenClasses/subjects", { replace : true });
        // window.location.reload()

    }

    return (
        <div>
            <div>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    취소
                </button>
                <button       
                    onClick={ onClickSubjectRegistrationHandler }             
                >
                    과목 등록
                </button>
            </div>        
            <div className={ SubjectRegistrationCSS.subjectSection }>
                <div className={ SubjectRegistrationCSS.subjectInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>과목명</label></td>
                                <td>
                                    <input 
                                        name='subjectName'
                                        placeholder='과목명'
                                        className={ SubjectRegistrationCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>   
                            <tr>
                                <td><label> 수업 형태</label></td>
                                <td>
                                    <input 
                                        name='subjectForm'
                                        placeholder='수업 형태'
                                        className={ SubjectRegistrationCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>     
                            <tr>
                                <td><label>언어</label></td>
                                <td>
                                    <input 
                                        name='subjectLanguage'
                                        placeholder='언어'
                                        className={ SubjectRegistrationCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>교재</label></td>
                                <td>
                                    <input 
                                        name='subjectBook'
                                        placeholder='교재'
                                        className={ SubjectRegistrationCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>   
                            <tr>
                                <td><label>과목 설명</label></td>
                                <td>
                                    <input 
                                        name='subjectDescription'
                                        placeholder='과목 설명'
                                        className={ SubjectRegistrationCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>     
                            <tr>
                                <td><label>과목 학습 목표</label></td>
                                <td>
                                    <textarea 
                                        className={ SubjectRegistrationCSS.textAreaStyle }
                                        name='subjectLearningObjectives'
                                        onChange={ onChangeHandler }
                                    ></textarea>
                                </td>
                            </tr> 
                        </tbody>                        
                    </table>
                </div>
            </div>
        </div>
    );

}

export default SubjectRegistration;