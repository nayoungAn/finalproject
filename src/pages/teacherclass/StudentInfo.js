import StudentInfoCSS from'./StudentInfo.module.css';
import {callStudentInfoAPI} from '../../api/StudentInfoAPICall';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";


function StudentInfo() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const studentinfo = useSelector(state => state.studentInfoReducer);
    const studentList = studentinfo.data;
 

    const pageInfo = studentinfo.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = pageInfo.startPage; i<= pageInfo.endPage; i++){
            pageNumber.push(i);
        }
    }
    
    useEffect(
        () => {         
            dispatch(callStudentInfoAPI({
                currentPage: currentPage,
            }));            
            
        }
        ,[currentPage]    
    );

    const onClickTeacherclass =(classCode)=> {
        navigate(`/ono/studentinfo/${classCode}`, {replace:false})
    }




    return (
        <>
        <div className={StudentInfoCSS.h2}>
            <h2>원생조회</h2>
            <table className={StudentInfoCSS.StudentInfo}>
                <thead className={StudentInfoCSS.classhead}>
                    <tr>
                        <th>No</th>
                        <th>학생명</th>
                        <th>이메일</th>
                        <th>연락처</th>
                        <th>강의수강상태</th>
                    </tr>
                </thead>

                <tbody className={StudentInfoCSS.memberinfo}>
                    {
                        Array.isArray(studentList) && studentList.map(
                            (m) => (
                            <tr
                           
                            key={ m.memberCode }
                            onClick={ () => onClickTeacherclass(m.memberCode)}
                    >
                            <td>{m.memberCode}</td>
                            <td>{m.memberName}</td>
                            <td>{m.memberEmail}</td>
                            <td>{m.memberPhone}</td>
                            <td>{m.memberStatus}</td>

                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>


        <div style={{listStyleType: 'none', display:'flex'}}>
            {
                Array.isArray(studentList)
                && 
                <button
                    onClick={()=> setCurrentPage(currentPage -1)}
                    disabled={ currentPage === 1}
                    className={ StudentInfoCSS.pagingBtn }
                    >
                        &lt;

                </button>               
            } 


            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? { color: "#2F65EB"} : null}
                    className={ StudentInfoCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}


            { Array.isArray(studentList) &&
            <button 
                className={ StudentInfoCSS.pagingBtn }
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
            >
                &gt;
            </button>

            }

        </div>

        </>

    );
}

export default StudentInfo;