import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import HeaderCSS from "../../components/common/Header";
import { useLocation } from 'react-router-dom';
import TeacherManagementCSS from './TeacherManagement.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callSearchTeacherListForAdminAPI } from '../../api/TeacherListAPICall';

function TeacherSearch() {

    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const { search } = useLocation();
    const { value } = queryString.parse(search);
    console.log('value', value);

    const dispatch = useDispatch();
    const teachers  = useSelector(state => state.teacherListReducer);      
    const teacherList = teachers.data;

    const [currentPage, setCurrentPage] = useState(1);
    const pageInfo = teachers.pageInfo;

    /* 페이징 버튼 */
    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }
    useEffect(
        () => {
            dispatch(callSearchTeacherListForAdminAPI({
                search : value,
                currentPage : currentPage
            }));
        }
        , [currentPage, value]
    );

    const onClickTeacherInsert = () => {
        console.log('[TeacherManagement] onClickTeacherInsert');
        navigate("/ono/teacher/regist", { replace: false })
    }

  const onClickTableTr = (memberCode) => {

    navigate(`/ono/teacher-update/${memberCode}`, { replace: false })

    }

     /* 검색 키워드 입력 시 입력 값 상태 저장 */
     const onSearchChangeHandler = (e) => {
        setSearchValue(e.target.value);
    }

    /* enter 키 입력 시 검색 화면으로 넘어가는 처리 */
    const onEnterKeyHandler = (e) => {
        if(e.key == 'Enter') {
            console.log('Enter key', searchValue);

            navigate(`/ono/teachers/search?value=${searchValue}`, { replace : false });
        }
    }

    return (
        <>
        <div className={ TeacherManagementCSS.bodyDiv }>
            <div>

                <button
                 onClick={ onClickTeacherInsert }> 강사등록 </button>

                <button        
                    onClick={ () => navigate("/ono/teacher") }            
                >
                    돌아가기
                </button>
                 <input
                    className={ HeaderCSS.InputStyle }
                    type="text"
                    placeholder="검색"
                    value={ searchValue }
                    onKeyUp={ onEnterKeyHandler }
                    onChange={ onSearchChangeHandler }
                />
             

            </div>            
            <table className={ TeacherManagementCSS.teacherTable }>
                <colgroup>
                    <col width="5%" />
                    <col width="15%" />
                    <col width="10%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="10%" />
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
                        <th>재직상태</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(teacherList) && teacherList.map((m) => (
                        <tr
                            key={ m.memberCode }
                            onClick={ () => onClickTableTr(m.memberCode) }
                        >
                            <td>{ m.memberCode }</td>
                            <td>{ m.memberName }</td>
                            <td>{ m.memberGender }</td>
                            <td>{ m.memberBirthday }</td>
                            <td>{ m.memberPhone }</td>
                            <td>{ m.memberEmail }</td>
                            <td>{ m.memberStatus }</td>
                            
                        </tr>
                    )) 
                    }
                </tbody>                    
            </table>         
        </div>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(teacherList) &&
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
            { Array.isArray(teacherList) &&
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

export default TeacherSearch;