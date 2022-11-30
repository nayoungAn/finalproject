import ClassRegistrationCSS from './ClassRegistration.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callClassRegistAPI } from '../../api/ClassAPICalls';
import { callClassListForAdminNoPagingAPI } from '../../api/ClassAPICalls';
import { callSubjectListForAdminNoPagingAPI } from '../../api/SubjectListAPICall';
import { callTeacherListForAdminNoPagingAPI } from '../../api/TeacherListAPICall';
import uuid from "react-uuid"


function ClassRegistration() {
    const subjects = useSelector(state => state.subjectListReducer);
    const teachers = useSelector(state => state.teacherListReducer);

    const schedule = ['월','화','수','목','금','토','일']
    const arr = [];
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        memberCode: 0,
        subjectCode: 0,
        className: '',
        classQuota: 0,
        classPrice: 0,
        classStartDate: '',
        classEndDate: '',
        classRoom: '',
        classDescription: '',
        classCircuit: '',
        classesScheduleList:[]
    });
    console.log(arr)
    useEffect(
        () => {
            dispatch(callClassListForAdminNoPagingAPI({
            }));
        dispatch(callSubjectListForAdminNoPagingAPI({
        }));
        dispatch(callTeacherListForAdminNoPagingAPI({
        }))
    }, []
    );

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,

        });

    }

    /* 강의 등록 버튼 클릭 이벤트 */
    const onClickClassRegistrationHandler = () => {

        dispatch(callClassRegistAPI({
            form: form,
            classesScheduleList : arr,
            subjectCode : form.subjectCode,
            memberCode : form.memberCode
        }));

        alert('강의가 등록되었습니다.');
        navigate("/ono/OpenClasses/classes", { replace: true });
    }
    /* 스케쥴 리스트 */
    const onClickCheckBox = (e) => {
        if (e.target.checked) {
            const b = e.target.value.split(",");
            let dayList = new Object();
            dayList.dayName = b[0]
            dayList.timeName = b[1]
            arr.push(dayList)
        }

        /* 체크를 해제할 경우 배열에서 제거 */
        else {
            const b = e.target.value.split(",");
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].dayName === b[0] && arr[i].timeName === b[1]) {
                    arr.splice(i, 1);
                    i--;
                }
            }
        }
    }

    
    return (
        <div>
            <div>
                <button
                    onClick={() => navigate(-1)}
                >
                    취소
                </button>
                <button
                    onClick={onClickClassRegistrationHandler}
                >
                    강의 등록
                </button>
            </div>
            <div className={ClassRegistrationCSS.classSection}>
                <div className={ClassRegistrationCSS.classInfoDiv}>
                    <table>
                    { Array.isArray(subjects) &&   Array.isArray(teachers) && (
                        <tbody>
                            <tr>
                                <td><label>과목명</label></td>
                                <td>
                                    <select
                                        id="subjectList"
                                        name='subjectCode'
                                        placeholder='과목명'
                                        className={ClassRegistrationCSS.classInfoInput}
                                        onChange={onChangeHandler}
                                    >
                                        <option>과목명</option>
                                    {subjects.map((item,idx) => (
                                    <option key={idx} name='subjectCode' value={item?.subjectCode} >
                                      {item?.subjectName}
                                    </option>
                                  ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label> 강사명</label></td>
                                <td>
                                    <select
                                        id="teacherList"
                                        name='memberCode'
                                        placeholder='강사명'
                                        className={ClassRegistrationCSS.classInfoInput}
                                        onChange={onChangeHandler}

                                    >  <option>강사명</option>
                                    {teachers.map((item,idx) => (
                                    <option key={idx} name='memberCode' value={item?.memberCode} >
                                      {item?.memberName}   
                                      </option>
                                          ))}
                                    </select>
                                </td>                              
                            </tr>
                            <tr>
                                <td><label> 강의명</label></td>
                                <td>
                                    <input
                                        name='className'
                                        placeholder='강의명'
                                        className={ClassRegistrationCSS.classInfoInput}
                                        onChange={onChangeHandler}
                                    />
                                </td>
                                </tr>
                                <tr>
                                <td><label>강의 회차</label></td>
                                <td>
                                    <input
                                        name='classCircuit'
                                        placeholder='1회차'
                                        className={ClassRegistrationCSS.classInfoInput}
                                        onChange={onChangeHandler}
                                    />
                                </td>
                           
                            </tr>
                            <tr>
                                <td><label>수강 정원</label></td>
                                <td>
                                    <input
                                        name='classQuota'
                                        placeholder='수강 정원'
                                        className={ClassRegistrationCSS.classInfoInput}
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><label>수업일</label></td>
                                <td>
                                    <label>
                                        <input
                                            name="classStartDate"
                                            placeholder='2022-10-15'
                                            className={ClassRegistrationCSS.classInfoInput}
                                            onChange={onChangeHandler}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        <input
                                            name="classEndDate"
                                            placeholder='2022-10-15
                                            
                                            '
                                            className={ClassRegistrationCSS.classInfoInput}
                                            onChange={onChangeHandler}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>수업료</label></td>
                                <td>
                                    <label>
                                        <input
                                            name="classPrice"
                                            placeholder='800000'
                                            className={ClassRegistrationCSS.classInfoInput}
                                            onChange={onChangeHandler}
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
                                            className={ClassRegistrationCSS.classInfoInput}
                                            onChange={onChangeHandler}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>강의 설명</label></td>
                                <td>
                                    <textarea
                                        className={ClassRegistrationCSS.textAreaStyle}
                                        name='classDescription'
                                        onChange={onChangeHandler}
                                    ></textarea>
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
                            <tr onClick={(event) => onClickCheckBox(event)}  >
                                <td>1교시</td>
                                {schedule.map((item,idx) => (
                                    <td key={uuid()}>
                                    <input type="checkbox" key={idx}  value={item + ",1교시"}  
                                    />
                                    </td>))}
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)} >
                                <td>2교시</td>
                                {schedule.map((item,idx) => (
                                    <td key={uuid()}>
                                    <input type="checkbox" key={idx}  value={item + ",2교시"}  
                                    />
                                    </td>))}
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)} >
                                <td>3교시</td>
                            {schedule.map((item,idx) => (
                                    <td key={uuid()}>
                                    <input type="checkbox" key={idx}  value={item + ",3교시"}  
                                    />
                                    </td>))}
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)} >
                                <td>4교시</td>
                                {schedule.map((item,idx) => (
                                    <td key={uuid()}>
                                    <input type="checkbox" key={idx}  value={item + ",4교시"}  
                                    />
                                    </td>))}
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)} >
                                <td>5교시</td>
                                {schedule.map((item,idx) => (
                                    <td key={uuid()}>
                                    <input type="checkbox" key={idx}  value={item + ",5교시"}  
                                    />
                                    </td>))}
                            </tr>


                        </tbody> )}
                    </table>

                </div>
            </div>
        </div>
    );

}

export default ClassRegistration;