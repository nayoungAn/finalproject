import TeacherManagementCSS from './TeacherManagement.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { callTeacherListForAdminAPI } from '../../api/TeacherAPICall';

function TeacherManagement() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const members  = useSelector(state => state.memberReducer);      
    const memberList = members.data;
    console.log('memberManagement', memberList);

    const pageInfo = members.pageInfo;

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
            dispatch(callTeacherListForAdminAPI({
                currentPage: currentPage,
            }));            
            
        }
        ,[currentPage]    
    );

    // const onClickSubjectInsert = () => {
    //     console.log('[SubjectManagement] onClickSubjectInsert');
    //     navigate("/ono/OpenClasses/subject-registration", { replace: false })
    // }

    // const onClickSubjectDelete = (subjectCode) => {
    //     console.log('[SubjectManagement] onClickSubjectDelete');
    //     {
    //         dispatch(callSubjectDeleteAPI({
    //             subjectCode : subjectCode
    //         }));
    //         console.log("삭제");
    //         alert('과목이 삭제되었습니다.');
    //          window.location.reload();
    //     }
    // }
    // const onClickTableTr = (e, memberCode) => {

    //     console.log(e.target.className);
        
    //     if(e.target.className != "deleteBtn")
    //             {
    //                 navigate(`/ono/OpenClasses/subject-update/${subjectCode}`, { replace: false })
    //                 console.log("상세조회");
    //             }     
    //     else {
    //         onClickSubjectDelete(memberCode);
    //     }
    // }

    return (
        <>
        <div className={ TeacherManagementCSS.bodyDiv }>
            <div>
                {/* <button
                    onClick={ onClickSubjectInsert }
                >
                    과목 등록
                </button> */}
            </div>            
            <table className={ TeacherManagementCSS.teacherTable }>
                <colgroup>
                    <col width="5%" />
                    <col width="15%" />
                    <col width="10%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>성별</th>
                        <th>생년월일</th>
                        <th>휴대전화</th>
                        <th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(memberList) && memberList.map((m) => (
                        <tr
                            key={ m.memberCode }
                            // onClick={ (event) => onClickTableTr(event, m.memberCode) }
                        >
                            <td>{ m.memberCode }</td>
                            <td>{ m.memberName }</td>
                            <td>{ m.memberGender }</td>
                            <td>{ m.memberBirthday }</td>
                            <td>{ m.memberPhone }</td>
                            <td>{ m.memberEmail }</td>
                            <td><button className="deleteBtn"
                  
                >
                    삭제
                </button></td>
                        </tr>
                    )) 
                    }
                </tbody>                    
            </table>         
            
        </div>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(memberList) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className={ TeacherManagementCSS.pagingBtn }
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                    className={ TeacherManagementCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(memberList) &&
            <button 
                className={ TeacherManagementCSS.pagingBtn }
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

export default TeacherManagement;