import SubjectManagementCSS from './SubjectManagement.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import{ callSubjectListForAdminAPI,callSubjectDeleteAPI } from '../../api/SubjectAPICalls';

function SubjectManagement() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const subjects  = useSelector(state => state.subjectReducer);      
    const subjectList = subjects.data;
    console.log('subjectManagement', subjectList);

    const pageInfo = subjects.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = pageInfo.startPage ; i <= pageInfo.endPage ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {         
            dispatch(callSubjectListForAdminAPI({
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    const onClickSubjectInsert = () => {
        console.log('[SubjectManagement] onClickSubjectInsert');
        navigate("/ono/OpenClasses/subject-registration", { replace: false })
    }
    const onClickSubjectDelete = (subjectCode) => {
        console.log('[SubjectManagement] onClickSubjectDelete');
     
        dispatch(callSubjectDeleteAPI({
            subjectCode : subjectCode
        }));
        
        window.location.reload();
        
    }
    const onClickTableTr = (e, subjectCode) => {

        console.log(e.target.className);
        console.log("상세조회");
        e.target.className = "deleteBtn" ? 
        false : navigate(`/ono/OpenClasses/subject-update/${subjectCode}`, { replace: false }) 
        
    }

    return (
        <>
        <div className={ SubjectManagementCSS.bodyDiv }>
            <div>
                <button
                    onClick={ onClickSubjectInsert }
                >
                    과목 등록
                </button>
            </div>            
            <table className={ SubjectManagementCSS.productTable }>
                <colgroup>
                    <col width="10%" />
                    <col width="30%" />
                    <col width="40%" />
                    <col width="10%" />
                    <col width="20%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>과목번호</th>
                        <th>과목명</th>
                        <th>과목 설명</th>
                        <th>언어</th>
                        <th>수업형태</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(subjectList) && subjectList.map((s) => (
                        <tr
                            key={ s.subjectCode }
                            onClick={ (event) => onClickTableTr(event, s.subjectCode) }
                        >
                            <td>{ s.subjectCode }</td>
                            <td>{ s.subjectName }</td>
                            <td>{ s.subjectDescription }</td>
                            <td>{ s.subjectLanguage }</td>
                            <td>{ s.subjectForm }</td>
                            <td><button className="deleteBtn"
                    onClick={ () => onClickSubjectDelete(s.subjectCode)}
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
            { Array.isArray(subjectList) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className={ SubjectManagementCSS.pagingBtn }
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                    className={ SubjectManagementCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(subjectList) &&
            <button 
                className={ SubjectManagementCSS.pagingBtn }
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

export default SubjectManagement;