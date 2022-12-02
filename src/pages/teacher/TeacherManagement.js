import TeacherManagementCSS from './TeacherManagement.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { callTeacherListForAdminAPI } from '../../api/TeacherListAPICall';


function TeacherManagement() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const members  = useSelector(state => state.teacherListReducer);      
    const memberList = members.data;
    const [search, setSearch] = useState('');
    
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


    const onClickTableTr = (memberCode) => {

     navigate(`/ono/teacher-update/${memberCode}`, { replace: false })
    }

    const onClickTeacherInsert = () => {
        console.log('[TeacherManagement] onClickTeacherInsert');
        navigate ('/ono/teacher/regist', {replace : true})
    }
 
/* 검색 키워드 입력 시 입력 값 상태 저장 */
const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
}
/* enter 키 입력 시 검색 화면으로 넘어가는 처리 */
const onEnterKeyHandler = (e) => {
    if(e.key == 'Enter') {
        console.log('Enter key', search);

        navigate(`/ono/teachers/search?value=${search}`, { replace : false });
    }
}
const onClickSearch = () => {
    navigate(`/ono/teachers/search?value=${search}`, { replace : false });
}


    return (
        <>
        <div className={ TeacherManagementCSS.bodyDiv }>
            <div>
            <h2> 강사 목록</h2>
              <button className={TeacherManagementCSS.btnSearch} onClick = { () => onClickSearch()}>검색</button>
             <input
                    className={ TeacherManagementCSS.InputStyle }
                    type="text"
                    placeholder="검색"
                    value={ search }
                    onKeyUp={ onEnterKeyHandler }
                    onChange={ onSearchChangeHandler }
                />

                </div>            
                <table className={ TeacherManagementCSS.teacherTable }>
                <colgroup>
                    <col width="5%" />
                    <col width="15%" />
                    <col width="10%" />
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
                        <th>재직상태</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(memberList) && memberList.map((m) => (
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
            <button
                 onClick={ onClickTeacherInsert } className={TeacherManagementCSS.btnRegist}> 강사등록 </button>
      
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
                    style={ currentPage === num ?
                         {color : '#2F65EB', textDecoration : 'underline'} : null}
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
            }  </div>
        </div>
        </>
    );
}

export default TeacherManagement;