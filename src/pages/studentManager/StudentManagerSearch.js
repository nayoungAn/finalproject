import StudentListmoduleCSS from './StudentManagerList.module.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { callSearchListAPI } from '../../api/StudentManagerAPICalls';
import queryString from 'query-string';

function StudentManagerSearch() {

    const navigate = useNavigate();
    const { search } = useLocation();
    const { value } = queryString.parse(search);

    const dispatch = useDispatch();
    const student  = useSelector(state => state.studentManagerReducer);      
    const studentList = student.data;
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {         
            dispatch(callSearchListAPI({
                search : value,
                currentPage: currentPage
            }));            
        }
        ,[currentPage, value]    
    );

    /* 페이징 버튼 */
    const pageInfo = student.pageInfo;
    const pageNumber = [];
    if(pageInfo){
        for(let i = pageInfo.startPage ; i <= pageInfo.endPage ; i++){
            pageNumber.push(i);
        }
    }

    const onClickNoticeInsert = () => {
        navigate("/ono/student-regist", {replace : false})
    }

    const onClickTableTr = (e, noticeCode) => {

        navigate(`/ono/student-manager/${noticeCode}`, { replace: false })

    }

    /* 검색 키워드 입력 시 입력 값 상태 저장 */
    const onSearchChangeHandler = (e) => {
        setSearchValue(e.target.value);
    }

    /* enter 키 입력 시 검색 화면으로 넘어가는 처리 */
    const onEnterKeyHandler = (e) => {
        if(e.key == 'Enter') {
            navigate(`/ono/student-manager/search?value=${searchValue}`, { replace : false });
        }
    }

    /* 검색 버튼 클릭시 검색 화면으로 넘어가는 처리 */
    const onClickSearchHandler = () => {
        
        navigate(`/ono/student-manager/search?value=${searchValue}`, { replace : false });
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
                <input
                    className={ StudentListmoduleCSS.InputStyle }
                    type="text"
                    placeholder="검색"
                    value={ searchValue }
                    onKeyUp={ onEnterKeyHandler }
                    onChange={ onSearchChangeHandler }
                />
                <button
                    onClick={ onClickSearchHandler }
                >
                    검색하기
                </button>
            </div>            
            <table className={ StudentListmoduleCSS.studentTable }>
                <colgroup>
                    <col width="10%" />
                    <col width="35%" />
                    <col width="15%" />
                    <col width="20%" />
                    <col width="20%" />
                    
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


export default StudentManagerSearch;