import ClassRegistrationCSS from './ClassRegistration.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callClassUpdateAPI } from '../../api/ClassAPICalls';
import { callClassDetailForAdminAPI } from '../../api/ClassAPICalls';
import { callSubjectListForAdminAPI } from '../../api/SubjectListAPICall';
import { callTeacherListForAdminAPI } from '../../api/TeacherListAPICall';


function ClassUpdate() {
    const subjects = useSelector(state => state.subjectListReducer);
    const subjectList = subjects.data;
    const [currentPage1, setCurrentPage1] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);
    const teachers = useSelector(state => state.teacherListReducer);
    const teacherList = teachers.data;

    const params = useParams();
    const classDetail = useSelector(state => state.classReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    /* date 형식 00:00:00 제거 */ 
    // const classStartdate = classDetail.classStartDate;
    // const classStartDateSplit= (classStartdate||'').split('T',1);
    // const classEnddate = classDetail.classEndDate;
    // const classEndDateSplit= (classEnddate||'').split('T',1);
    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 최초 랜더링 시 상품 상세 정보 조회 */
    useEffect(() => {
        dispatch(callSubjectListForAdminAPI({
            currentPage: currentPage1
        }));
        dispatch(callTeacherListForAdminAPI({
            currentPage: currentPage2
        }))

        dispatch(callClassDetailForAdminAPI({
            classCode: params.classCode
        }));
    }, [currentPage1, currentPage2]);

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        console.log(e.target.value)
    }
    console.log("시작날짜보기",form.classStartDate)

    /* 수정 모드 변경 이벤트 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            memberName: classDetail.member.memberName,
            subjectName: classDetail.subject.subjectName,
            classCode: classDetail.classCode,
            className: classDetail.className,
            classQuota: classDetail.classQuota,
            classPrice: classDetail.classPrice,
            classStatus: classDetail.classStatus,
            classStartDate:(classDetail.classStartDate||'').split('T',1),
            classEndDate: (classDetail.classEndDate||'').split('T',1),
            classRoom: classDetail.classRoom,
            classDescription: classDetail.classDescription,
            classCircuit: classDetail.classCircuit,
            classesScheduleList: classDetail.classesScheduleList,
            classStudents : classDetail.classStudents

        });
    }

    /* 상품 수정 저장 버튼 클릭 이벤트 */
    const onClickClassUpdateHandler = () => {


        dispatch(callClassUpdateAPI({
            form: form,
            classesScheduleList : scheduleList,
            subjectCode : form.subjectCode,
            memberCode : form.memberCode
        }));
        alert('강의가 수정되었습니다.');
        navigate('/ono/OpenClasses/classes', { replace: true });
    }


     /* 조회 시 시간표 */ 
        var cbox ;
        const scheduleList = classDetail.classesScheduleList;
        const arr = []
        var a ;

        if (scheduleList ) {
            for (var ele of scheduleList) {
                // arr.push(ele.dayName, ele.timeName)
                
                console.log(ele.dayName, ele.timeName)
                a = ele.dayName + ele.timeName
                cbox = document.getElementById(a);
                cbox.checked = true
            }
            }
        console.log(scheduleList)
    /* 수정 시 스케쥴 저장 */
    const onClickCheckBox = (e) => {
        if( modifyMode == true){
        if (e.target.checked) {
            const b = e.target.value.split(",");
            console.log(b[0], b[1])
            let dayList = new Object();
            dayList.dayName = b[0]
            dayList.timeName = b[1]
            console.log(dayList)
            scheduleList.push(dayList)
    
            console.log(scheduleList)
        }
        /* 체크를 해제할 경우 배열에서 제거 */
        else {
            console.log("체크해제가 되었다.");
            const b = e.target.value.split(",");
            for (var i = 0; i < scheduleList.length; i++) {
                if (scheduleList[i].dayName === b[0] && scheduleList[i].timeName === b[1]) {
                    scheduleList.splice(i, 1);
                    i--;
                }
            }
            console.log(scheduleList)
         }
        }
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


    return (

        <div>
            <div>

                <button
                    onClick={() => navigate(-1)}
                >
                    돌아가기
                </button>
                {!modifyMode &&
                    <button
                        onClick={onClickModifyModeHandler}
                    >
                        수정 모드
                    </button>
                }

                {modifyMode &&
                    <button
                        onClick={onClickClassUpdateHandler}
                    >
                        강의 수정 저장하기
                    </button>
                }
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
                                        placeholder={classDetail.subjectName}
                                        className={ClassRegistrationCSS.classInfoInput}
                                        onChange={onChangeHandler}
                                    ><option>{classDetail.subjectName}</option></select>
                                    
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
                                <td><label>수강 정원</label></td>
                                <td>
                                    <input
                                        name='classQuota'
                                        placeholder='수강 정원'
                                        className={ClassRegistrationCSS.classInfoInput}
                                        onChange={onChangeHandler}
                                        value={(!modifyMode ? classDetail.classQuota : form.classQuota) || 0}
                                        readOnly={modifyMode ? false : true}
                                    // style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>수업료</label></td>
                                <td>
                                    <label>
                                        <input
                                            name="classPrice"
                                            place='수업료'
                                            className={ClassRegistrationCSS.classInfoInput}
                                            onChange={onChangeHandler}
                                            value={(!modifyMode ? classDetail.classPrice : form.classPrice) || 0}
                                            readOnly={modifyMode ? false : true}
                                        // style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                        />
                                    </label>
                                </td>
                            </tr>    
                            <tr>
                                <td><label>개설여부</label></td>
                                <td>
                                    <label>
                                         <select
                                        name='classStatus'
                                        value={(!modifyMode ? classDetail.classStatus : form.classStatus) || 0}
                                        readOnly={modifyMode ? false : true}
                                        className={ClassRegistrationCSS.classInfoInput}
                                        onChange={onChangeHandler}
                                    >
                                        <option >개강</option>
                                        <option >폐강</option>

                                    </select>
                                        
                                    </label>
                                </td>
                            </tr>    
                            <tr>
                                <td><label>수업일</label></td>
                                <td>
                                    <label>
                                        <input
                                            name="classStartDate"
                                            placeholder='시작일'
                                            className={ClassRegistrationCSS.classInfoInput}
                                            onChange={onChangeHandler}
                                            value={(!modifyMode ? (classDetail.classStartDate||'').split('T',1)
                                            : form.classStartDate) || 0}
                                            readOnly={modifyMode ? false : true}
                                        // style={ !modifyMode ? { backgroundColor : 'gray'} : null }
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
                                            className={ClassRegistrationCSS.classInfoInput}
                                            onChange={onChangeHandler}
                                            value={(!modifyMode ?  (classDetail.classEndDate||'').split('T',1)
                                            : form.classEndDate) || 0}
                                            readOnly={modifyMode ? false : true}
                                        // style={ !modifyMode ? { backgroundColor : 'gray'} : null }
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
                                            value={(!modifyMode ? classDetail.classRoom : form.classRoom) || ''}
                                            readOnly={modifyMode ? false : true}
                                        // style={ !modifyMode ? { backgroundColor : 'gray'} : null }
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
                                        value={(!modifyMode ? classDetail.classDescription : form.classDescription) || ''}
                                        readOnly={modifyMode ? false : true}
                                    // style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    ></textarea>
                                </td>
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
                            <tr  onClick={(event) => onClickCheckBox(event)}>
                            
                                <td>1교시</td>

                                <td><input type="checkbox" id="월1교시" value="월,1교시" /> </td>
                                <td><input type="checkbox" id="화1교시" value="화,1교시" /> </td>
                                <td><input type="checkbox" id="수1교시" value="수,1교시" /> </td>
                                <td><input type="checkbox" id="목1교시" value="목,1교시" /> </td>
                                <td><input type="checkbox" id="금1교시" value="금,1교시" /> </td>
                                <td><input type="checkbox" id="토1교시" value="토,1교시" /> </td>
                                <td><input type="checkbox" id="일1교시" value="일,1교시" /> </td>
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)}>
                                <td>2교시</td>
                                <td><input type="checkbox" id="월2교시" value="월,2교시" /> </td>
                                <td><input type="checkbox" id="화2교시" value="화,2교시" /> </td>
                                <td><input type="checkbox" id="수2교시" value="수,2교시" /> </td>
                                <td><input type="checkbox" id="목2교시" value="목,2교시" /> </td>
                                <td><input type="checkbox" id="금2교시" value="금,2교시" /> </td>
                                <td><input type="checkbox" id="토2교시" value="토,2교시" /> </td>
                                <td><input type="checkbox" id="일2교시" value="일,2교시" /> </td>
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)}>
                                <td>3교시</td>
                                <td><input type="checkbox" id="월3교시" value="월,3교시" /> </td>
                                <td><input type="checkbox" id="화3교시" value="화,3교시" /> </td>
                                <td><input type="checkbox" id="수3교시" value="수,3교시" /> </td>
                                <td><input type="checkbox" id="목3교시" value="목,3교시" /> </td>
                                <td><input type="checkbox" id="금3교시" value="금,3교시" /> </td>
                                <td><input type="checkbox" id="토3교시" value="토,3교시" /> </td>
                                <td><input type="checkbox" id="일3교시" value="일,3교시" /> </td>
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)}>
                                <td>4교시</td>
                                <td><input type="checkbox" id="월4교시" value="월,4교시" /> </td>
                                <td><input type="checkbox" id="화4교시" value="화,4교시" /> </td>
                                <td><input type="checkbox" id="수4교시" value="수,4교시" /> </td>
                                <td><input type="checkbox" id="목4교시" value="목,4교시" /> </td>
                                <td><input type="checkbox" id="금4교시" value="금,4교시" /> </td>
                                <td><input type="checkbox" id="토4교시" value="토,4교시" /> </td>
                                <td><input type="checkbox" id="일4교시" value="일,4교시" /> </td>
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)}>
                                <td>5교시</td>
                                <td><input type="checkbox" id="월5교시" value="월,5교시" /> </td>
                                <td><input type="checkbox" id="화5교시" value="화,5교시" /> </td>
                                <td><input type="checkbox" id="수5교시" value="수,5교시" /> </td>
                                <td><input type="checkbox" id="목5교시" value="목,5교시" /> </td>
                                <td><input type="checkbox" id="금5교시" value="금,5교시" /> </td>
                                <td><input type="checkbox" id="토5교시" value="토,5교시" /> </td>
                                <td><input type="checkbox" id="일5교시" value="일,5교시" /> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}

export default ClassUpdate;