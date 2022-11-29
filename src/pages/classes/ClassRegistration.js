import ClassRegistrationCSS from './ClassRegistration.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { callClassRegistAPI } from '../../api/ClassAPICalls';


function ClassRegistration(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        memberName : '',
        subjectName : '',
        className : '',
        classQuota : 0,
        classPrice : 0,
        classStartDate : '',
        classEndDate : '',
        classRoom : '',
        classDescription : '',
        classCircuit : '',
        classesScheduleList : ''
    });

    // ["월,1교시","화,1교시"]

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    /* 상품 등록 버튼 클릭 이벤트 */
    const onClickClassRegistrationHandler = () => {

        dispatch(callClassRegistAPI({
            form : form
        }));

        alert('과의가 등록되었습니다.');
        navigate("/ono/OpenClasses/classes", { replace : true });
        // window.location.reload()

        
    } 

    const onClickCheckBox = (e) => {
        if(e.checked = true){
            console.log("체크가되었다.")
        }
        else console.log("체크해제가 되었다.");
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
                    onClick={ onClickClassRegistrationHandler }             
                >
                    강의 등록
                </button>
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
                                    />
                                </td>
                            </tr>   
                            <tr>
                                <td><label> 강사명</label></td>
                                <td>
                                    <input 
                                        name='memberName'
                                        placeholder='강사명 형태'
                                        className={ ClassRegistrationCSS.classInfoInput }
                                        onChange={ onChangeHandler }
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
                                    />
                                </td>
                            </tr>    
                       
                             <tr>
                                <td><label>수업일</label></td>
                                <td>
                                    <label>
                                        <input 
                                            name="classStartDate"  
                                            placeholder='시작일'
                                            className={ ClassRegistrationCSS.classInfoInput }
                                            onChange={ onChangeHandler } 
                                            /> 
                                    </label>
                                </td>
                            </tr>    
                            <tr>
                                <td>
                                    <label>
                                        <input 
                                            name="classEndDate"  
                                            placeholder='종료일'
                                            className={ ClassRegistrationCSS.classInfoInput }
                                            onChange={ onChangeHandler } 
                                            /> 
                                    </label>
                                </td>
                            </tr>    
                            <tr>
                                <td><label>시간표</label></td>
                             </tr>
                              <tr>
                            <td>요일</td>
                            <td>월</td>
                            <td>화</td>
                            <td>수</td>
                            <td>목</td>
                            <td>금</td>
                            <td>토</td>
                            <td>일</td>
                        </tr>
                        <tr>
                            <td>1교시</td>                         

                            <td><input type="checkbox"  onClick= { (event) => onClickCheckBox(event)} value="월,1교시"/> </td>
                            <td><input type="checkbox"   onClick= { (event) => onClickCheckBox(event)} value="화,1교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="수,1교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="목,1교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="금,1교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="토,1교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="일,1교시"/> </td>
                        </tr>
                        <tr>
                        <td>2교시</td>
                            <td><input type="checkbox"  name="scheduleList" value="월,2교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="화,2교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="수,2교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="목,2교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="금,2교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="토,2교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="일,2교시"/> </td>
                        </tr>
                        <tr>
                        <td>3교시</td>
                            <td><input type="checkbox"  name="scheduleList" value="월,3교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="화,3교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="수,3교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="목,3교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="금,3교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="토,3교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="일,3교시"/> </td>
                        </tr>
                        <tr>
                        <td>4교시</td>
                            <td><input type="checkbox"  name="scheduleList" value="월,4교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="화,4교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="수,4교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="목,4교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="금,4교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="토,4교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="일,4교시"/> </td>
                        </tr>
                        <tr>
                        <td>5교시</td>
                            <td><input type="checkbox"  name="scheduleList" value="월,5교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="화,5교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="수,5교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="목,5교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="금,5교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="토,5교시"/> </td>
                            <td><input type="checkbox"  name="scheduleList" value="일,5교시"/> </td>
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

export default ClassRegistration;