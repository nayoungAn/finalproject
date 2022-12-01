import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import StudentManagerDetailCSS from './StudentManagerDetail.module.css';
import { callStudentManagerDetailForAdminAPI} from '../../api/StudentManagerDetailAPICall';
import ClassHistoryUpdateModal from "../../components/common/classHistory/ClassHistoryUpdateModal";
import uuid from 'react-uuid';
function ClassHistoryList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const studentDetail = useSelector(state => state.classHistoryRefreshReducer);
    const [classHistoryUpdateModal, setClassHistoryUpdateModal] = useState(false);
    const [classHistoryCode, setClassHistoryCode] = useState(0);
    const [classCode, setClassCode] = useState(0);
    const [classStatus, setClassStatus] = useState(0);
    const [startDate, setStartDate] = useState(0);


    const studentInfo = studentDetail.memberInfo;
    const classHistory = studentDetail.lectureList
    
    /* 수정 버튼 클릭시 해당 수강 이력 코드를 보내줌 */ 
    const onClickUpdateHandler = (classHistoryCode,classCode,classStatus,startDate) => {
        setClassHistoryCode(classHistoryCode);
        setClassCode(classCode)
        setClassStatus(classStatus)
        setStartDate(startDate)
        setClassHistoryUpdateModal(true);
      };

      
    return (
        <>     { classHistoryUpdateModal ? <ClassHistoryUpdateModal 
        key={uuid()} classHistoryCode = { classHistoryCode} 
        classCode = { classCode } 
        classStatus = { classStatus }
        startDate = { startDate }
        setClassHistoryUpdateModal={ setClassHistoryUpdateModal }/> : null }    
            <div>
            <div className={ StudentManagerDetailCSS.subjectSection }>
               
                <div>
                <table width="100%">
                <colgroup>
                    <col width="40%" />
                    <col width="10%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="10%" />
                    <col width="30%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>강의명</th>
                        <th>강사명</th>
                        <th>강의실</th>
                        <th>등록일</th>
                        <th>수강료</th>
                        <th>수강상태</th> 
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(studentDetail.lectureList) && studentDetail.lectureList.map((m) => (
                        <tr key={uuid()}>
                            <td>{ m.openClasses.className }</td>
                            <td>{ m.openClasses.member.memberName }</td>
                            <td>{ m.openClasses.classRoom }</td>
                            <td>{ m.startDate.split('T',1)}</td>
                            <td>{ m.openClasses.classPrice}</td>
                            <td>{ m.classStatus}</td>
                            <td>{m.classHistoryCode}</td>
                        <td><button onClick={() => {onClickUpdateHandler(m.classHistoryCode,
                           m.openClasses.classCode, m.classStatus,  m.startDate)}}>수정</button></td>
                        </tr>
                    )) 
                    }
                </tbody>    
                                    
            </table>
                </div>
            </div>
        </div>
    </>
    );

}

export default ClassHistoryList;