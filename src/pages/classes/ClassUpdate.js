import ClassUpdateCSS from './ClassUpdate.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callClassUpdateAPI } from '../../api/ClassAPICalls';
import { callClassDetailForAdminAPI } from '../../api/ClassAPICalls';
import { callSubjectListForAdminNoPagingAPI } from '../../api/SubjectListAPICall';
import { callTeacherListForAdminNoPagingAPI } from '../../api/TeacherListAPICall';
import uuid from "react-uuid"

function ClassUpdate() {
    const subjects = useSelector(state => state.subjectListReducer);
    const teachers = useSelector(state => state.teacherListReducer);
    
    const params = useParams();
    const classDetail = useSelector(state => state.classReducer);
    const schedule = ['월','화','수','목','금','토','일']

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        
    });
   
    const [modifyMode, setModifyMode] = useState(false);

    /* 최초 랜더링 시 상품 상세 정보 조회 */
    useEffect(() => {
        dispatch(callSubjectListForAdminNoPagingAPI({
        }));
        dispatch(callTeacherListForAdminNoPagingAPI({
        }))

        dispatch(callClassDetailForAdminAPI({
            classCode: params.classCode
        }));
    }, []);

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }

    /* 수정 모드 변경 이벤트 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            memberName: classDetail.member.memberName,
            subjectName: classDetail.subject.subjectName,
            subjectCode: classDetail.subject.subjectCode,
            memberCode: classDetail.member.memberCode,
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
        const scheduleList = classDetail.classesScheduleList;
        const arr = []
        var a ;

        if (scheduleList) {
            for (var ele of scheduleList) {
                a = ele.dayName + ele.timeName
                arr.push(a)
      
            }
            }
    /* 수정 시 스케쥴 저장 */
    const onClickCheckBox = (e) => {
        if( modifyMode == true){
        if (e.target.checked) {
            const b = e.target.value.split(",");
            let dayList = new Object();
            dayList.dayName = b[0]
            dayList.timeName = b[1]
            scheduleList.push(dayList)
    
        }
        /* 체크를 해제할 경우 배열에서 제거 */
        else {
            const b = e.target.value.split(",");
            for (var i = 0; i < scheduleList.length; i++) {
                if (scheduleList[i].dayName === b[0] && scheduleList[i].timeName === b[1]) {
                    scheduleList.splice(i, 1);
                    i--;
                }
            }
         }
        }
    }



    return (

        <div>
            <div>
            <h2 className={ClassUpdateCSS.h2}> 강의 상세 조회</h2>
               </div>
            <div className={ClassUpdateCSS.classSection}>
                <div className={ClassUpdateCSS.classInfoDiv}>
                    <table>
                        { classDetail.subject && classDetail.member && (
                        <tbody>
                            
                            <tr>
                            <td className={ ClassUpdateCSS.classTableTd}>
                                <label>과목명</label></td>
                                <td className={ ClassUpdateCSS.subjectTabletd}>
                                    <select
                                        id="subjectList"
                                        name='subjectCode'
                                        className={ClassUpdateCSS.subjectInfoInput}
                                        key={uuid()}
                                        onChange={onChangeHandler}
                                        value={(!modifyMode ? classDetail.subject.subjectCode: form.subjectCode) || 0}
                                        readOnly={modifyMode ? false : true}
                                    > 
                                  {subjects.map((item,idx) => (
                                    <option key={idx} name='subjectCode' value={item.subjectCode} >
                                      {item.subjectName}
                                    </option>
                                  ))}
                                    </select>
                                    
                                </td>
                                <td className={ ClassUpdateCSS.classTableTd}>
                                <label> 강사명</label></td>
                                <td className={ ClassUpdateCSS.subjectTabletd} >
                                    <select
                                        id="teacherList"
                                        name='memberCode'
                                        className={ClassUpdateCSS.subjectInfoInput}
                                        value={(!modifyMode ? classDetail.member.memberCode: form.memberCode) || 0}
                                        readOnly={modifyMode ? false : true}
                                        key={uuid()}
                                        onChange={onChangeHandler}
                                    >
                                         {teachers.map((item,idx) => (
                                    <option key={idx} name='memberCode' value={item.memberCode} >
                                      {item.memberName}
                                    </option>
                                  ))}
                                     </select>
                                </td>                              
                            </tr>
                            <tr>    
                            <td className={ ClassUpdateCSS.classTableTd}>
                                <label> 강의명</label></td>
                                <td colSpan="2" 
                                className={ ClassUpdateCSS.classTabletd}>
                                    <input
                                        name='className'
                                        placeholder='강의명'
                                        className={ClassUpdateCSS.classInfoInput}
                                        onChange={onChangeHandler}
                                        value={(!modifyMode ? classDetail.className : form.className) || 0}
                                        readOnly={modifyMode ? false : true}

                                    />
                                </td>
                            <td className={ ClassUpdateCSS.classTableTd}>
                            <label>강의 회차</label></td>
                            <td className={ ClassUpdateCSS.classTabletd}>
                                    <input
                                        name='classCircuit'
                                        placeholder='1회차'
                                        className={ClassUpdateCSS.classInfoInput}
                                        value={(!modifyMode ? classDetail.classCircuit : form.classCircuit) || ''}
                                        readOnly={modifyMode ? false : true}        
                                        onChange={onChangeHandler}
                                    />
                                </td>

                               
                                </tr>
                            <tr>
                                <td className={ ClassUpdateCSS.classTableTd}>
                                <label>수강 정원</label></td>
                                <td className={ ClassUpdateCSS.classTabletd}>
                                    <input
                                        name='classQuota'
                                        placeholder='수강 정원'
                                        className={ClassUpdateCSS.classInfoInput}
                                        onChange={onChangeHandler}
                                        value={(!modifyMode ? classDetail.classQuota : form.classQuota) || 0}
                                        readOnly={modifyMode ? false : true}
                                    // style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                                <td className={ ClassUpdateCSS.classTableTd}>
                                <label>수업료</label></td>
                                <td className={ ClassUpdateCSS.classTabletd}>
                                    <label>
                                        <input
                                            name="classPrice"
                                            place='수업료'
                                            className={ClassUpdateCSS.classInfoInput}
                                            onChange={onChangeHandler}
                                            value={(!modifyMode ? classDetail.classPrice : form.classPrice) || 0}
                                            readOnly={modifyMode ? false : true}
                                        // style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                        />
                                    </label>
                                </td>
                            </tr>    
                            <tr>
                                <td className={ ClassUpdateCSS.classTableTd}>
                                <label>개설여부</label></td>
                                <td className={ ClassUpdateCSS.subjectTabletd}>
                                    <label>
                                         <select
                                        name='classStatus'
                                        value={(!modifyMode ? classDetail.classStatus : form.classStatus) || 0}
                                        readOnly={modifyMode ? false : true}
                                        className={ClassUpdateCSS.subjectInfoInput}
                                        onChange={onChangeHandler}
                                    >
                                        <option>개강</option>
                                        <option>폐강</option>

                                    </select>
                                        
                                    </label>
                                </td>
                                
                                <td className={ ClassUpdateCSS.classTableTd}><label>강의실</label></td>
                                <td className={ ClassUpdateCSS.classTabletd}>
                                    <label>
                                        <input
                                            name="classRoom"
                                            placeholder='1강의장'
                                            className={ClassUpdateCSS.classInfoInput}
                                            onChange={onChangeHandler}
                                            value={(!modifyMode ? classDetail.classRoom : form.classRoom) || ''}
                                            readOnly={modifyMode ? false : true}
                                        // style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                        />
                                    </label>
                                </td>
                            </tr>    
                            <tr>
                                <td className={ ClassUpdateCSS.classTableTd}><label>수업일</label></td>
                                <td className={ ClassUpdateCSS.classTabletd}>
                                    <label>
                                        <input
                                            name="classStartDate"
                                            placeholder='시작일'
                                            className={ClassUpdateCSS.classInfoInput}
                                            onChange={onChangeHandler}
                                            value={(!modifyMode ? (classDetail.classStartDate||'').split('T',1)
                                             + "~"
                                            : form.classStartDate) || 0}
                                            readOnly={modifyMode ? false : true}
                                        // style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                        />
                                    </label>
                                </td>
                                <td className={ ClassUpdateCSS.classTabletd}>
                                    <label>
                                        <input
                                            name="classEndDate"
                                            placeholder='종료일'
                                            className={ClassUpdateCSS.classInfoInput}
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
                                <td className={ ClassUpdateCSS.classTableTd}>
                                <label>강의 설명</label></td>
                                <td colSpan="2">
                                    <textarea
                                        className={ClassUpdateCSS.textAreaStyle}
                                        name='classDescription'
                                        onChange={onChangeHandler}
                                        value={(!modifyMode ? classDetail.classDescription : form.classDescription) || ''}
                                        readOnly={modifyMode ? false : true}
                                    // style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    ></textarea>
                                </td>
                            </tr>
                            
                       
                        </tbody>     )}
                    </table>
                    <div>
                        <table className={ClassUpdateCSS.scheduleTable}>
                            <tbody>
                            <tr>
                                <td colSpan="8" className={ ClassUpdateCSS.classTableTd}>
                                    <label>시간표</label></td>
                            </tr>
                            <tr>
                                <td className={ ClassUpdateCSS.classTabletd}>요일</td>
                                <td className={ ClassUpdateCSS.classTabletd}>월</td>
                                <td className={ ClassUpdateCSS.classTabletd}>화</td>
                                <td className={ ClassUpdateCSS.classTabletd}>수</td>
                                <td className={ ClassUpdateCSS.classTabletd}>목</td>
                                <td className={ ClassUpdateCSS.classTabletd}>금</td>
                                <td className={ ClassUpdateCSS.classTabletd}>토</td>
                                <td className={ ClassUpdateCSS.classTabletd}>일</td>
                            </tr>
                            <tr  onClick={(event) => onClickCheckBox(event)}>
                            
                                <td className={ ClassUpdateCSS.classTabletd}>1교시</td>

                                {schedule.map((item,idx) => (
                                    <td key={uuid()} className={ClassUpdateCSS.scheduleTd}>
                                    <input type="checkbox" key={idx}  value={item + ",1교시"  }  
                                    onChange = {onChangeHandler} checked = {arr.includes(item + "1교시")}
                                    id={item + schedule[0]} />
                                    <label htmlFor={item + schedule[0]}></label>
                                    </td>))}
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)}>
                                <td className={ ClassUpdateCSS.classTabletd}>2교시</td>
                               
                                {schedule.map((item,idx) => (
                                    <td key={uuid()} className={ClassUpdateCSS.scheduleTd} >
                                    <input type="checkbox" key={idx}  value={item + ",2교시"  }  onChange = {onChangeHandler} checked = {arr.includes(item + "2교시")}
                                   id={item + schedule[1]} />
                                   <label htmlFor={item + schedule[1]}></label>
                                    </td>))}
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)}>
                                <td className={ ClassUpdateCSS.classTabletd}>3교시</td>
                               
                                {schedule.map((item,idx) => (
                                    <td key={uuid()} className={ClassUpdateCSS.scheduleTd}>
                                    <input type="checkbox" key={idx}  value={item + ",3교시"  }  onChange = {onChangeHandler} checked = {arr.includes(item + "3교시")}
                                   id={item + schedule[2]} />
                                   <label htmlFor={item + schedule[2]}></label>
                                    </td>))}
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)}>
                                <td className={ ClassUpdateCSS.classTabletd}>4교시</td>
                                
                                {schedule.map((item,idx) => (
                                    <td key={uuid()} className={ClassUpdateCSS.scheduleTd}>
                                    <input type="checkbox" key={idx}  value={item + ",4교시"  }  onChange = {onChangeHandler} checked = {arr.includes(item + "4교시")}
                                    id={item + schedule[3]} />
                                    <label htmlFor={item + schedule[3]}></label>
                                    </td>))}
                            </tr>
                            <tr onClick={(event) => onClickCheckBox(event)}>
                                <td className={ ClassUpdateCSS.classTabletd}>5교시</td>
                                
                                {schedule.map((item,idx) => (
                                    <td key={uuid()} className={ClassUpdateCSS.scheduleTd}>
                                    <input type="checkbox" key={idx}  value={item + ",5교시"  }  onChange = {onChangeHandler} checked = {arr.includes(item + "5교시")}
                                    id={item + schedule[4]} />
                                    <label htmlFor={item + schedule[4]}></label>
                                    </td>))}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <button
             className={ClassUpdateCSS.CancelBtn}
                    onClick={() => navigate(-1)}
                >
                    돌아가기
                </button>
                {!modifyMode &&
                    <button
                        onClick={onClickModifyModeHandler}
                        className={ClassUpdateCSS.ModifyBtn}
                    >
                        수정 모드
                    </button>
                }

                {modifyMode &&
                    <button
                        onClick={onClickClassUpdateHandler}
                        className={ClassUpdateCSS.RegistBtn}
                    >
                       수정
                    </button>
                }
         

        </div>
    );

}

export default ClassUpdate;