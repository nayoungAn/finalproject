import ClassRegistrationCSS from './ClassRegistration.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callClassRegistAPI } from '../../api/ClassAPICalls';
import { callSubjectListForAdminAPI } from '../../api/SubjectListAPICall';
import { callTeacherListForAdminAPI } from '../../api/TeacherListAPICall';


function ClassRegistration() {
    const subjects = useSelector(state => state.subjectListReducer);
    const subjectList = subjects.data;
    const [currentPage1, setCurrentPage1] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);
    const teachers = useSelector(state => state.teacherListReducer);
    const teacherList = teachers.data;

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
        classesScheduleList: []
    });

    useEffect(
        () => {
            dispatch(callSubjectListForAdminAPI({
                currentPage: currentPage1
            }));
            dispatch(callTeacherListForAdminAPI({
                currentPage: currentPage2
            }))
        }
        , [currentPage1, currentPage2]
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
        // window.location.reload()


    }

    const getSubjectList = () => {
 
        const target = document.getElementById('target_btn');
        target.disabled = true;
        
        console.log(subjectList)
        setCurrentPage1(1);
        var i;
        var selectOptions = "";
        
        if (subjectList) {
            for (i = 0; i < subjectList.length; i++) {
                selectOptions += "<option value=" + subjectList[i].subjectCode + ">" + subjectList[i].subjectName + "</option>"

            }
            selectOptions += "<option value=더보기>" + "더보기..." + "</option>"
            document.getElementById("subjectList").innerHTML = selectOptions;

            console.log(form.subjectCode)
            console.log(document.getElementById("subjectList"))
           
        }
        // setForm({
        //     subjectCode : form.subjectCode
        // })
    }

    const loadMoreSubjectList = (e) => {
        
        var i;
        var selectOptions = "";
    
        if (e.target.value == "더보기") {
      
             setCurrentPage1(currentPage1 + 1)
             dispatch(callTeacherListForAdminAPI({
                currentPage: currentPage1
            }))
             console.log("더보기")
             
            if (subjectList) {
                for (i = 0; i < subjectList.length; i++) {
                    selectOptions += "<option value=" + subjectList[i].subjectCode + ">" + subjectList[i].subjectName + "</option>"

                }
                selectOptions += "<option value=더보기>" + "더보기..." + "</option>"
                selectOptions += "<option value=돌아가기>" + "돌아가기..." + "</option>"
                document.getElementById("subjectList").innerHTML = selectOptions;
                 

            }
        }
        else if (e.target.value == "돌아가기") {
            getSubjectList()
        }
        console.log(form.subjectCode)
        // setForm({
        //     subjectCode : form.subjectCode
        // })
    }
    
    const getTeacherList = () => {

        const target = document.getElementById('target_btn2');
        target.disabled = true;
        setCurrentPage2(1);
        console.log(teacherList)

        var i;
        var selectOptions = "";
        if (teacherList) {
            for (i = 0; i < teacherList.length; i++) {
                selectOptions += "<option value=" + teacherList[i].memberCode + ">" + teacherList[i].memberName + "</option>"
            }
            selectOptions += "<option value=더보기>" + "더보기..." + "</option>"
            document.getElementById("teacherList").innerHTML = selectOptions;

            console.log(form.memberCode)
            console.log(document.getElementById("teacherList"))
            
        }
        // setForm({
        //     memberCode : form.memberCode
        // })
    }

    const loadMoreTeacherList = (e) => {
        var i;
        var selectOptions = "";

        if (e.target.value == "더보기") {
            console.log("더보기")
            setCurrentPage2(currentPage2 + 1)
            if (teacherList) {
                for (i = 0; i < teacherList.length; i++) {
                    selectOptions += "<option value=" + teacherList[i].memberCode + ">" + teacherList[i].memberName + "</option>"

                }
                selectOptions += "<option value=더보기>" + "더보기..." + "</option>"
                selectOptions += "<option value=돌아가기>" + "돌아가기..." + "</option>"
                document.getElementById("teacherList").innerHTML = selectOptions;
                

            }
        }
        else if (e.target.value == "돌아가기") {
            getTeacherList()
        }
        console.log(form.memberCode)
        // setForm({
        //     memberCode : form.memberCode
        // })
    }


    const arr = [];
    const onClickCheckBox = (e) => {
        if (e.target.checked) {
            const b = e.target.value.split(",");
            console.log(b[0], b[1])
            let dayList = new Object();
            dayList.dayName = b[0]
            dayList.timeName = b[1]
            console.log(dayList)
            arr.push(dayList)
    
            console.log(arr)
        }
        /* 체크를 해제할 경우 배열에서 제거 */
        else {
            console.log("체크해제가 되었다.");
            const b = e.target.value.split(",");
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].dayName === b[0] && arr[i].timeName === b[1]) {
                    arr.splice(i, 1);
                    i--;
                }
            }

            console.log(arr)
         
        }
        
        console.log(arr)
  
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
                        <tbody>
                            <tr>
                                <td><label>과목명</label></td>
                                <td>
                                    <select
                                        onClick={(e) => loadMoreSubjectList(e)}
                                        id="subjectList"
                                        name='subjectCode'
                                        placeholder='과목명'
                                        className={ClassRegistrationCSS.classInfoInput}
                                        onChange={onChangeHandler}
                                    ></select>
                                </td>
                                <td><button id='target_btn' onClick={() => getSubjectList()}>과목 목록 불러오기</button></td>
                            </tr>
                            <tr>
                                <td><label> 강사명</label></td>
                                <td>
                                    <select
                                        onClick={(e) => loadMoreTeacherList(e)}
                                        id="teacherList"
                                        name='memberCode'
                                        placeholder='강사명'
                                        className={ClassRegistrationCSS.classInfoInput}
                                        onChange={onChangeHandler}
                                    />
                                </td>
                                    <td><button id='target_btn2' onClick={() => getTeacherList()}>강사 목록 불러오기</button></td>
                              
                            </tr>
                            <tr>
                                <td><label> 강의명</label></td>
                                <td>
                                    <input
                                        onClick={(e) => loadMoreTeacherList(e)}
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

                                <td><input type="checkbox"  value="월,1교시" /> </td>
                                <td><input type="checkbox" value="화,1교시" /> </td>
                                <td><input type="checkbox" value="수,1교시" /> </td>
                                <td><input type="checkbox" value="목,1교시" /> </td>
                                <td><input type="checkbox" value="금,1교시" /> </td>
                                <td><input type="checkbox"  value="토,1교시" /> </td>
                                <td><input type="checkbox"  value="일,1교시" /> </td>
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)} >
                                <td>2교시</td>
                                <td><input type="checkbox" value="월,2교시" /> </td>
                                <td><input type="checkbox" value="화,2교시" /> </td>
                                <td><input type="checkbox" value="수,2교시" /> </td>
                                <td><input type="checkbox" value="목,2교시" /> </td>
                                <td><input type="checkbox" value="금,2교시" /> </td>
                                <td><input type="checkbox" value="토,2교시" /> </td>
                                <td><input type="checkbox" value="일,2교시" /> </td>
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)} >
                                <td>3교시</td>
                                <td><input type="checkbox" value="월,3교시" /> </td>
                                <td><input type="checkbox"  value="화,3교시" /> </td>
                                <td><input type="checkbox"  value="수,3교시" /> </td>
                                <td><input type="checkbox"  value="목,3교시" /> </td>
                                <td><input type="checkbox"  value="금,3교시" /> </td>
                                <td><input type="checkbox"  value="토,3교시" /> </td>
                                <td><input type="checkbox"  value="일,3교시" /> </td>
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)} >
                                <td>4교시</td>
                                <td><input type="checkbox" value="월,4교시" /> </td>
                                <td><input type="checkbox"  value="화,4교시" /> </td>
                                <td><input type="checkbox"  value="수,4교시" /> </td>
                                <td><input type="checkbox" value="목,4교시" /> </td>
                                <td><input type="checkbox"  value="금,4교시" /> </td>
                                <td><input type="checkbox"  value="토,4교시" /> </td>
                                <td><input type="checkbox"  value="일,4교시" /> </td>
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)} >
                                <td>5교시</td>
                                <td><input type="checkbox" value="월,5교시" /> </td>
                                <td><input type="checkbox" value="화,5교시" /> </td>
                                <td><input type="checkbox" value="수,5교시" /> </td>
                                <td><input type="checkbox" value="목,5교시" /> </td>
                                <td><input type="checkbox" value="금,5교시" /> </td>
                                <td><input type="checkbox" value="토,5교시" /> </td>
                                <td><input type="checkbox" value="일,5교시" /> </td>
                            </tr>


                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );

}

export default ClassRegistration;