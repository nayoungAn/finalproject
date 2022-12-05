import { callStudentClassesListAPI } from"../../api/StudentAPICalls";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import StudentClasses from './StudentClasses.module.css';
import { useState,useEffect } from "react";


function Teacherclass() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useSelector(state => state.studentClassReducer);
    const classesList = classes.data
 
   

    const pageInfo = classes.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = pageInfo.startPage; i<= pageInfo.endPage; i++){
            pageNumber.push(i);
        }
    }
    
    useEffect(
        () => {         
            dispatch(callStudentClassesListAPI({
                currentPage: currentPage,
            }));            
            
        }
        ,[currentPage]    
    );

    const onClickTeacherclass =(classCode)=> {
        navigate(`/ono/student/studentClassesDetail/${classCode}`, {replace:false})
    }


    return (
        <>
        <div> <h3>내 강의 </h3></div>

        <div>
            
            <table className={StudentClasses.classtable}>
                <thead className={StudentClasses.classhead}>
                    <tr>
                        <th>No.</th>
                        <th>강의명</th>
                        <th>시작일</th>
                        <th>종료일</th>
                        <th>강의진행상태</th>
                        <th>담당강사</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        Array.isArray(classesList) && classesList.map(
                            (c) => (
                            <tr
                            key={c.openClasses.classCode }
                            onClick={ () => onClickTeacherclass(c.openClasses.classCode)}
                    >
                            <td>{c.openClasses.classCode}</td>
                            <td>{c.openClasses.className}</td>
                            <td>{c.openClasses.classStartDate.split("T",1)}</td>
                            <td>{c.openClasses.classEndDate.split("T",1)}</td>
                            <td>{c.openClasses.classStatus}</td>
                            <td>{c.openClasses.member.memberName}</td>

                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>


        <div style={{listStyleType: 'none', display:'flex'}}>
            {
                Array.isArray(classesList)
                && 
                <button
                    onClick={()=> setCurrentPage(currentPage -1)}
                    disabled={ currentPage === 1}
                    className={ StudentClasses.pagingBtn }
                    >
                        &lt;

                </button>               
            } 


            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'transparent' } : null}
                    className={ StudentClasses.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}

            { Array.isArray(classesList) &&
            <button 
                className={ StudentClasses.pagingBtn }
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
export default Teacherclass;