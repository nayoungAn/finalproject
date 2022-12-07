import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ClassManagementCSS from './ClassManagement.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callSearchClassListAPI } from '../../api/ClassAPICalls';


function ClassSearch() {

    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const { search } = useLocation();
    const { value } = queryString.parse(search);
    const dispatch = useDispatch();
    const classes  = useSelector(state => state.classReducer);      
    const classList = classes.data;
    /* 정렬 규칙 */ 
    const orderBy = ['월','화','수','목','금','토','일'];

    const [currentPage, setCurrentPage] = useState(1);
    const pageInfo = classes.pageInfo;

    /* 페이징 버튼 */
    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }
    useEffect(
        () => {
            dispatch(callSearchClassListAPI({
                search : value,
                currentPage : currentPage
            }));
        }
        , [currentPage, value]
    );

    const onClickClassInsert = () => {
        navigate("/ono/OpenClasses/class-registration", { replace: false })
    }


    const onClickTableTr = (classCode) => {

        navigate(`/ono/OpenClasses/class-update/${classCode}`, { replace: false })
        
    
        }

     /* 검색 키워드 입력 시 입력 값 상태 저장 */
     const onSearchChangeHandler = (e) => {
        setSearchValue(e.target.value);
    }

    /* enter 키 입력 시 검색 화면으로 넘어가는 처리 */
    const onEnterKeyHandler = (e) => {
        if(e.key == 'Enter') {

            navigate(`/ono/OpenClasses/classes/search?value=${searchValue}`, { replace : false });
        }
    }

    
    return (
        <>
       
        <div className={ ClassManagementCSS.bodyDiv }>
            <div>
            <h2 className={ ClassManagementCSS.h2}>검색된 결과 : {value}</h2>
            <div className={ClassManagementCSS.search}>
                <input
                    className={ ClassManagementCSS.InputStyle }
                    type="text"
                    placeholder="검색"
                    value={ searchValue }
                    onKeyUp={ onEnterKeyHandler }
                    onChange={ onSearchChangeHandler }
                />
                <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"></img>
            </div>
            </div>        
            <table className={ ClassManagementCSS.classTable }>
                <colgroup>
                    <col width="10%" />
                    <col width="15%" />
                    <col width="40%" />
                    <col width="10%" />
                    <col width="10%" />
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
            <div>            
                <button        
                    onClick={ () => navigate("/ono/OpenClasses/classes") }
                    className={ClassManagementCSS.CancelBtn}           
            
                >
                    돌아가기
                </button>     
            <button
                    onClick={ onClickClassInsert }
                    className={ClassManagementCSS.RegistBtn}
                >
                    등록
                </button>
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
                      style={ currentPage === num ?
                        { color : '#2F65EB', textDecoration : 'underline'} : null}
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
        </div>
        </>
    );
}

export default ClassSearch;