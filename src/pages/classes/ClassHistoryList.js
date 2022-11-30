import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import StudentManagerDetailCSS from './StudentManagerDetail.module.css';
import { callStudentManagerDetailForAdminAPI} from '../../api/StudentManagerDetailAPICall';

import uuid from 'react-uuid';
function ClassHistoryList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const studentDetail = useSelector(state => state.classHistoryRefreshReducer);
    const studentInfo = studentDetail.memberInfo;
    const classHistory = studentDetail.lectureList

    // console.log("studentDetail", studentDetail)
    // // useEffect(() => {
    // //     }, [studentDetail]);

    return (
        <>
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
                            <td><button>수정</button></td>
                            <td><button>삭제</button></td>
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