import { useState } from 'react';
import { useSelector } from 'react-redux';
import ClassHistoryListCSS from './ClassHistory.module.css';
import ClassHistoryUpdateModal from "../../components/common/classHistory/ClassHistoryUpdateModal";
import uuid from 'react-uuid';
function ClassHistoryList() {

    const studentDetail = useSelector(state => state.classHistoryRefreshReducer);
    const [classHistoryUpdateModal, setClassHistoryUpdateModal] = useState(false);
    const [classHistoryCode, setClassHistoryCode] = useState(0);
    const [classCode, setClassCode] = useState(0);
    const [classStatus, setClassStatus] = useState(0);
    const [startDate, setStartDate] = useState(0);


    
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
            <div className={ ClassHistoryListCSS.classHistorySection }>         
                <div>       
                 <h3 className={ ClassHistoryListCSS.classHistoryname}>수강 목록</h3>
                <table className={ClassHistoryListCSS.ClassHistoryTable} width="100%">
                <colgroup>
                    <col width="5%" />
                    <col width="25%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <thead >
                    <tr>
                        <th >No</th>
                        <th>강의명</th>
                        <th>강사명</th>
                        <th>강의실</th>
                        <th>등록일</th>
                        <th>수강료</th>
                        <th>수강상태</th> 
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(studentDetail.lectureList) && studentDetail.lectureList.map((m,index) => (
                        <tr key={uuid()}>
                            <td>{index + 1}</td>
                            <td>{ m.openClasses.className }</td>
                            <td>{ m.openClasses.member.memberName }</td>
                            <td>{ m.openClasses.classRoom }</td>
                            <td>{ m.startDate.split('T',1)}</td>
                            <td>{ m.openClasses.classPrice}</td>
                            <td>{ m.classStatus}</td>
                        <button onClick={() => {onClickUpdateHandler(m.classHistoryCode,
                           m.openClasses.classCode, m.classStatus,  m.startDate)}}
                           className={ClassHistoryListCSS.ModifyBtn}>수정</button>
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