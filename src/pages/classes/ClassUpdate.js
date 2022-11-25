import ClassRegistrationCSS from './ClassRegistration.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callClassUpdateAPI } from '../../api/ClassAPICalls';
import { callClassDetailForAdminAPI } from '../../api/ClassAPICalls';

function ClassUpdate(){

    const params = useParams();
    const classDetail = useSelector(state => state.classReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    

    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 최초 랜더링 시 상품 상세 정보 조회 */
    useEffect(()=> {
        dispatch(callClassDetailForAdminAPI({
            classCode : params.classCode
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
            memberName: classDetail.member.memberName,
            subjectName : classDetail.subject.subjectName,
            classCode : classDetail.classCode,
            className : classDetail.className,
            classQuota : classDetail.classQuota,
            classPrice : classDetail.classPrice,
            classStartDate: classDetail.classStartDate,
            classEndDate : classDetail.classEndDate,
            classRoom : classDetail.classRoom,
            classDescription : classDetail.classDescription,
            classCircuit : classDetail.classCircuit,
            classesScheduleList : classDetail.classesScheduleList
        });
    }

    /* 상품 수정 저장 버튼 클릭 이벤트 */
    const onClickClassUpdateHandler = () => {


        dispatch(callClassUpdateAPI({
            form : form
        }));
        alert('강의가 수정되었습니다.');
        navigate('/ono/OpenClasses/classes', { replace : true });
    }

    
    const schedule = (() => {
        const scheduleList = classDetail.classesScheduleList;
        const arr = []
        if(scheduleList) {
            for (var ele of scheduleList) {
                arr.push(ele.dayName)
                arr.push(ele.timeName)
                
                }
        }
         
        // console.log(scheduleList);
        console.log(arr)
        return arr
       
    })
    
  
    return (

        <div>
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
                    onClick={ onClickClassUpdateHandler }
                >
                    강의 수정 저장하기
                </button>
            }
            </div>        
            <div className={ ClassRegistrationCSS.classSection }>
                <div className={ ClassRegistrationCSS.classInfoDiv }>
                    <table>
                        <tbody>
                        <tr>
                                <td><label>과목명</label></td>
                                <td>
                                    <input 
                                        name='subjectName'
                                        placeholder='과목명'
                                        className={ ClassRegistrationCSS.classInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? classDetail.subject?.subjectName : form.subjectName) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>강사명</label></td>
                                <td>
                                    <input 
                                        name='memberName'
                                        placeholder='강사명'
                                        className={ ClassRegistrationCSS.classInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? classDetail.member?.memberName : form.memberName) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>수강 정원</label></td>
                                <td>
                                    <input 
                                        name='classQuota'
                                        placeholder='수강 정원'
                                        className={ ClassRegistrationCSS.classInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? classDetail.classQuota : form.classQuota) || 0 }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>시간표</label></td>
                                <td>
                                    <input 
                                        name='classesScheduleList'
                                        placeholder='강의명'
                                        className={ ClassRegistrationCSS.classInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? schedule() : form.classesScheduleList) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>수업료</label></td>
                                <td>
                                    <label>
                                        <input 
                                            name="classPrice"  
                                            placeholder='수업료'
                                            className={ ClassRegistrationCSS.classInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? classDetail.classPrice : form.classPrice) || 0 }
                                            readOnly={ modifyMode ? false : true }
                                            style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                            /> 
                                    </label>
                                </td>
                            </tr>    <tr>
                                <td><label>수업일</label></td>
                                <td>
                                    <label>
                                        <input 
                                            name="classStartDate"  
                                            placeholder='시작일'
                                            className={ ClassRegistrationCSS.classInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? classDetail.classStartDate : form.classPrice) || 0 }
                                            readOnly={ modifyMode ? false : true }
                                            style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                            /> 
                                    </label>
                                </td>
                            </tr>    <tr>
                                <td>
                                    <label>
                                        <input 
                                            name="classEndDate"  
                                            placeholder='종료일'
                                            className={ ClassRegistrationCSS.classInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? classDetail.classEndDate : form.classEndDate) || 0 }
                                            readOnly={ modifyMode ? false : true }
                                            style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                            /> 
                                    </label>
                                </td>
                            </tr>    
                            <tr>
                                <td><label>강의실</label></td>
                                <td>
                                    <label>
                                        <input 
                                            name="classRoom"  
                                            placeholder='1강의장'
                                            className={ ClassRegistrationCSS.classInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? classDetail.classRoom : form.classRoom) || '' }
                                            readOnly={ modifyMode ? false : true }
                                            style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                            /> 
                                    </label>
                                </td>
                            </tr>   
                          
                    
                        
                            <tr>
                                <td><label>강의 설명</label></td>
                                <td>
                                    <textarea 
                                        className={ ClassRegistrationCSS.textAreaStyle }
                                        name='classDescription'
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? classDetail.classDescription : form.classDescription) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
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

export default ClassUpdate;