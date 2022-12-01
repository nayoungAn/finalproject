import ClassManagementCSS from './ClassManagement.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { callClassListForAdminAPI } from '../../api/ClassAPICalls';

function ClassManagement() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes  = useSelector(state => state.classReducer);      
    const classList = classes.data;
    const [search, setSearch] = useState('');
    /* 정렬 규칙 */ 
    const orderBy = ['월','화','수','목','금','토','일'];

    
    const pageInfo = classes.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = pageInfo.startPage ; i <= pageInfo.endPage ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {         
            dispatch(callClassListForAdminAPI({
                currentPage: currentPage
            }));            
            
        }
        ,[currentPage]    
    );

    const onClickClassInsert = () => {
        console.log('[ClassManagement] onClickClassInsert');
        navigate("/ono/OpenClasses/class-registration", { replace: false })
    }

    const onClickTableTr = (classCode) => {

    navigate(`/ono/OpenClasses/class-update/${classCode}`, { replace: false })
    

    }

       /* 검색 키워드 입력 시 입력 값 상태 저장 */
       const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }
    /* enter 키 입력 시 검색 화면으로 넘어가는 처리 */
    const onEnterKeyHandler = (e) => {
        if(e.key == 'Enter') {
            console.log('Enter key', search);

            navigate(`/ono/classes/search?value=${search}`, { replace : false });
        }
    }

    const onClickSearch = () => {
        navigate(`/ono/teachers/search?value=${search}`, { replace : false });
    }
    return (
        <>
       
        <div className={ ClassManagementCSS.bodyDiv }>
            <div>
                <button
                    onClick={ onClickClassInsert }
                >
                    강의 등록
                </button>
                <input
                    className={ ClassManagementCSS.InputStyle }
                    type="text"
                    placeholder="검색"
                    value={ search }
                    onKeyUp={ onEnterKeyHandler }
                    onChange={ onSearchChangeHandler }
                />
                <button className="btnSearch" onClick = { () => onClickSearch()}>검색</button>
            </div>            
            <table className={ ClassManagementCSS.classTable }>
                <colgroup>
                    <col width="10%" />
                    <col width="30%" />
                    <col width="40%" />
                    <col width="10%" />
                    <col width="20%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>강의번호</th>
                        <th>강사명</th> 
                        <th>강의명</th>
                        <th>수강일</th>
                        <th>강의실</th>
                        <th>정원</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(classList) && classList.map((c) => (
                        <tr
                            key={ c.classCode }
                            onClick={ () => onClickTableTr(c.classCode) }
                        >
                            <td>{ c.classCode }</td>
                            <td>{ c.member.memberName }</td>
                            <td>{ c.className }</td>
                           <td>{c.classesScheduleList.map((d) => d.dayName).reduce((ac, v) => ac.includes(v) ? ac : [...ac, v], [])
                            .sort((a, b) => orderBy.indexOf(a) - orderBy.indexOf(b)) + " "} </td> 
                            <td>{ c.classRoom }</td>
                            <td>{ c.classStudents + "/" + c.classQuota}</td>
                        </tr>
                    )) /* 수강일 중복 삭제 및 정렬 */ 
                    }
                </tbody>                    
            </table>         
            
        </div>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(classList) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className={ ClassManagementCSS.pagingBtn }
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                    className={ ClassManagementCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(classList) &&
            <button 
                className={ ClassManagementCSS.pagingBtn }
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

export default ClassManagement;