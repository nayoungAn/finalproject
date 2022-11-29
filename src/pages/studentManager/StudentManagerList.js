import StudentListmoduleCSS from './StudentManagerList.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { callStudentManagerListAPI } from '../../api/StudentManagerAPICalls';

function StudentList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const student  = useSelector(state => state.studentManagerReducer);      
    const studentList = student.data;
    console.log('studentList', studentList);

    const pageInfo = student.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = pageInfo.startPage ; i <= pageInfo.endPage ; i++){
            pageNumber.push(i);
        }
    }
    // window.location.reload()
    useEffect(
        () => {         
            dispatch(callStudentManagerListAPI({
                currentPage: currentPage,
            }));            
            
        }
        ,[currentPage]    
    );

    const onClickNoticeInsert = () => {
        navigate("/ono/student-regist", {replace : false})
    }

    const onClickTableTr = (e, noticeCode) => {

        console.log(e.target.className);

        navigate(`/ono/student-manager/${noticeCode}`, { replace: false })
        console.log("상세조회");
    }

    return (
        <>
        <div className={ StudentListmoduleCSS.bodyDiv }>
            <div>
                <button
                    onClick={ onClickNoticeInsert }
                >
                    등록하기
                </button>
            </div>            
            <table className={ StudentListmoduleCSS.studentTable }>
                <colgroup>
                    <col width="5%" />
                    <col width="20%" />
                    <col width="10%" />
                    <col width="30%" />
                    <col width="35%" />
                    
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>전화번호</th>
                        <th>등록날짜</th>
                        
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(studentList) && studentList.map((m) => (
                        <tr
                            key={ m.memberCode }
                            onClick={ (event) => onClickTableTr(event, m.memberCode) }
                        >
                            <td>{ m.memberCode }</td>
                            <td>{ m.memberName }</td>
                            <td>{ m.memberBirthday }</td>
                            <td>{ m.memberPhone }</td>
                            <td>{ m.memberRegisterDate }</td>

                        </tr>
                    )) 
                    }
                </tbody>    
                                    
            </table>         
            
        </div>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(studentList) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className={ StudentListmoduleCSS.pagingBtn }
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                    className={ StudentListmoduleCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(studentList) &&
            <button 
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


export default StudentList;