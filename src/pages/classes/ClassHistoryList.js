import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import StudentManagerDetailCSS from './StudentManagerDetail.module.css';

function ClassHistoryList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const studentDetail = useSelector(state => state.studentManagerReducer);
    const studentInfo = studentDetail.memberInfo;
    const params = useParams();
    
    const [form, setForm] = useState({});

    /* 읽기모드와 수정모드를 구분 */




    return (
        <>
            <div>
            <div className={ StudentManagerDetailCSS.subjectSection }>
                <div className={ StudentManagerDetailCSS.subjectInfoDiv }>
                </div>
                <div>
                <table className={ StudentManagerDetailCSS.studentClassTable }>
                <colgroup>
                    <col width="40%" />
                    <col width="30%" />
                    
                </colgroup>
                <thead>
                    <tr>
                        <th>강의명</th>
                        <th>강의실</th>
                        
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(studentDetail.lectureList) && studentDetail.lectureList.map((m) => (
                        <tr key={m.openClasses.classCode }>
                            <td>{ m.openClasses.className }</td>
                            <td>{ m.openClasses.classRoom }</td>

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