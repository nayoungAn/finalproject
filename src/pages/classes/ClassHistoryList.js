import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import StudentManagerDetailCSS from './StudentManagerDetail.module.css';

function ClassHistoryList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const studentDetail = useSelector(state => state.classHistoryReducer);
    const studentInfo = studentDetail.memberInfo;
    const params = useParams();
    
    const [form, setForm] = useState({});

    if(studentDetail.lectureList)
    {
        console.log(studentDetail.lectureList)
    }
    console.log(studentDetail)




    return (
        <>
            <div>
            <div className={ StudentManagerDetailCSS.subjectSection }>
               
                <div>
                <table className={ StudentManagerDetailCSS.studentClassTable }>
                <colgroup>
                    <col width="40%" />
                    <col width="30%" />
                    <col width="30%" />
                    <col width="30%" />
                    <col width="30%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>강의명</th>
                        <th>강사명</th>
                        <th>강의실</th>
                        <th>수강료</th>
                        <th>수강료</th> 
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(studentDetail.lectureList) && studentDetail.lectureList.map((m) => (
                        <tr key={m.openClasses.classCode }>
                            <td>{ m.openClasses.className }</td>
                            <td>{ m.openClasses.member.memberName }</td>
                            <td>{ m.openClasses.classRoom }</td>
                            <td>{ m.openClasses.classPrice}</td>
                            <td>{ m.openClasses.classStatus}</td>
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