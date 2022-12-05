import SubjectUpdateCSS from './SubjectUpdate.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callSubjectUpdateAPI } from '../../api/SubjectAPICalls';
import { callSubjectDetailForAdminAPI } from '../../api/SubjectListAPICall';
function SubjectUpdate(){

    const params = useParams();
    const subjectDetail = useSelector(state => state.subjectListReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 최초 랜더링 시 상품 상세 정보 조회 */
    useEffect(()=> {
        dispatch(callSubjectDetailForAdminAPI({
            subjectCode : params.subjectCode
        }));
    }, []);


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
            subjectCode : subjectDetail.subjectCode,
            subjectName : subjectDetail.subjectName,
            subjectForm : subjectDetail.subjectForm,
            subjectLanguage : subjectDetail.subjectLanguage,
            subjectBook : subjectDetail.subjectBook,
            subjectDescription: subjectDetail.subjectDescription,
            subjectLearningObjectives : subjectDetail.subjectLearningObjectives
        });
    }

    /* 상품 수정 저장 버튼 클릭 이벤트 */
    const onClickSubjectUpdateHandler = () => {

        const formData = new FormData();

        formData.append("subjectCode", form.subjectCode);
        formData.append("subjectName", form.subjectName);
        formData.append("subjectForm", form.subjectForm);
        formData.append("subjectLanguage", form.subjectLanguage);
        formData.append("subjectBook", form.subjectBook);
        formData.append("subjectDescription", form.subjectDescription);
        formData.append("subjectLearningObjectives", form.subjectLearningObjectives);

        dispatch(callSubjectUpdateAPI({
            form : formData
        }));
        alert('과목이 수정되었습니다.');
        navigate('/ono/OpenClasses/subjects', { replace : true });
    }

    return (
        <div>
            <div>
                <h2> 과목 상세 조회 </h2>
             
            </div>        
            <div className={ SubjectUpdateCSS.subjectSection }>
                <div className={ SubjectUpdateCSS.subjectInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td className={ SubjectUpdateCSS.subjectTableTd}>
                                <label>과목명</label></td>
                                <td className={ SubjectUpdateCSS.subjectTabletd}>
                                    <input 
                                        name='subjectName'
                                        placeholder='과목명'
                                        className={ SubjectUpdateCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? subjectDetail.subjectName : form.subjectName) || '' }
                                        readOnly={ modifyMode ? false : true }
                                    />
                                </td>
                                <td className={ SubjectUpdateCSS.subjectTableTd}>
                                <label>수업 형태</label></td>
                                <td className={ SubjectUpdateCSS.subjectTabletd}>
                                    <input 
                                        name='subjectForm'
                                        placeholder='수업 형태'
                                        className={ SubjectUpdateCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? subjectDetail.subjectForm : form.subjectForm) || '' }
                                        readOnly={ modifyMode ? false : true }
                                    />
                                </td>
                                <td className={ SubjectUpdateCSS.subjectTableTd}>
                                <label>언어</label></td>
                                <td className={ SubjectUpdateCSS.subjectTabletd}>
                                    <label>
                                        <input 
                                            name="subjectLanguage"  
                                            placeholder='언어'
                                            className={ SubjectUpdateCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? subjectDetail.subjectLanguage : form.subjectLanguage) || '' }
                                            readOnly={ modifyMode ? false : true }
                                            /> 
                                    </label>
                                </td>
                            </tr>    
                            <tr>
                                <td className={ SubjectUpdateCSS.subjectTableTd}>
                                <label>교재</label>
                                </td>
                                <td colSpan="2" className={ SubjectUpdateCSS.subjectTabletd}>
                                        <input 
                                            name="subjectBook"  
                                            placeholder='교재'
                                            className={ SubjectUpdateCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? subjectDetail.subjectBook : form.subjectBook) || '' }
                                            readOnly={ modifyMode ? false : true }
                                            /> 
                                </td>
                            </tr>
                            <tr>
                                <td className={ SubjectUpdateCSS.subjectTableTd}> 
                                <label>과목 설명</label></td>
                                <td colSpan="3"className={ SubjectUpdateCSS.subjectTabletd}>
                                        <input 
                                            name="subjectDescription"  
                                            placeholder='과목 설명'
                                            className={ SubjectUpdateCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? subjectDetail.subjectDescription : form.subjectDescription) || '' }
                                            readOnly={ modifyMode ? false : true }
                                            /> 
                                </td>
                            </tr>
                            <tr>
                            <td className={ SubjectUpdateCSS.subjectTableTd}>
                                <label>과목 학습 목표</label></td>
                                <td colSpan='4'className={ SubjectUpdateCSS.subjectTabletd}>
                                    <textarea 
                                        className={ SubjectUpdateCSS.textAreaStyle }
                                        name='subjectLearningObjectives'
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? subjectDetail.subjectLearningObjectives : form.subjectLearningObjectives) || '' }
                                        readOnly={ modifyMode ? false : true }
                                    ></textarea>
                                </td>
                            </tr> 
                    
                        </tbody>                        
                    </table>
                </div>
            </div>
            <button        
            className={SubjectUpdateCSS.btnCancle}
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
            {!modifyMode &&
                <button 
                    onClick={ onClickModifyModeHandler }
                    className={SubjectUpdateCSS.btnRegist}
                >
                    수정 모드
                </button>
            }
            {modifyMode &&
                <button 
                className={SubjectUpdateCSS.btnRegist} 
                    onClick={ onClickSubjectUpdateHandler }
                >
                    수정하기
                </button>
            }
        </div>
    );

}

export default SubjectUpdate;