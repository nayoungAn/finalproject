// import NoticeListmoduleCSS from './StudentNoticeList.module.css';
// import HeaderCSS from "../../components/common/Header";
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect, useState } from "react";
// import { callSearchListForAdminAPI  } from '../../api/StudentAPICalls';
// import { useLocation } from 'react-router-dom';
// import queryString from 'query-string';

// function StudentNoticeSearch() {

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const notice  = useSelector(state => state.noticeReducer);      
//     const noticeList = notice.data;
//     const [searchValue, setSearchValue] = useState('');
//     const { search } = useLocation();
//     const { value } = queryString.parse(search);
//     console.log('noticeList', noticeList);
//     console.log('value', value);

//     const pageInfo = notice.pageInfo;

//     const [currentPage, setCurrentPage] = useState(1);

//     const pageNumber = [];
//     if(pageInfo){
//         for(let i = pageInfo.startPage ; i <= pageInfo.endPage ; i++){
//             pageNumber.push(i);
//         }
//     }
//     // window.location.reload()
//     useEffect(
//         () => {
//             dispatch(callSearchListForAdminAPI({
//                 search : value,
//                 currentPage : currentPage
//             }));
//         }
//         , [currentPage, value]
//     );


//     /* 검색 키워드 입력 시 입력 값 상태 저장 */
//     const onSearchChangeHandler = (e) => {
//         setSearchValue(e.target.value);
//     }
//     /* enter 키 입력 시 검색 화면으로 넘어가는 처리 */
//     const onEnterKeyHandler = (e) => {
//         if(e.key == 'Enter') {
//             console.log('Enter key', searchValue);

//             //navigate(`/ono/student/studentnotice/search?value=${searchValue}`, { replace : false });
//         }
//     }


    
//     const onClickTableTr = (e, noticeCode) => {

//         console.log(e.target.className);
        
//         if(e.target.className !== "deleteBtn")
//                 {
//                     navigate(`/ono/student/studentNoticeDetail/${noticeCode}`, { replace: false })
//                     console.log("상세조회");
//                 }     
       
//     }

//     return (
//         <>
//         <div className={ NoticeListmoduleCSS.bodyDiv }>
//             <div>
//             <input
//                     className={ HeaderCSS.InputStyle }
//                     type="text"
//                     placeholder="검색"
//                     value={ searchValue }
//                     onKeyUp={ onEnterKeyHandler }
//                     onChange={ onSearchChangeHandler }
//                 />
//             </div>            
//             <table className={ NoticeListmoduleCSS.teacherTable }>
//                 <colgroup>
//                     <col width="5%" />
//                     <col width="55%" />
//                     <col width="15%" />
//                     <col width="30%" />
//                 </colgroup>
//                 <thead>
//                     <tr>
//                         <th>번호</th>
//                         <th>제목</th>
//                         <th>등록일</th>
//                         <th>작성자</th>
                        
//                     </tr>
//                 </thead>
//                 <tbody>
//                     { Array.isArray(noticeList) && noticeList.map((n) => (
//                         <tr
//                             key={ n.noticeCode }
//                             onClick={ (event) => onClickTableTr(event, n.noticeCode) }
//                         >
//                             <td>{ n.noticeCode }</td>
//                             <td>{ n.noticeTitle }</td>
//                             <td>{ n.noticeDate?.split(" 00:00:00",1) }</td>
//                             <td>{ n.member?.memberName }</td>
                
//                         </tr>
//                     )) 
//                     }
//                 </tbody>    
                                    
//             </table>         
            
//         </div>
//         <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
//             { Array.isArray(noticeList) &&
//             <button 
//                 onClick={() => setCurrentPage(currentPage - 1)} 
//                 disabled={currentPage === 1}
//                 className={ NoticeListmoduleCSS.pagingBtn }
//             >
//                 &lt;
//             </button>
//             }
//             {pageNumber.map((num) => (
//             <li key={num} onClick={() => setCurrentPage(num)}>
//                 <button
//                     style={ currentPage === num ? {backgroundColor : 'orange' } : null}
//                     className={ NoticeListmoduleCSS.pagingBtn }
//                 >
//                     {num}
//                 </button>
//             </li>
//             ))}
//             { Array.isArray(noticeList) &&
//             <button 
//                 onClick={() => setCurrentPage(currentPage + 1)} 
//                 disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
//             >
//                 &gt;
//             </button>
//             }
//         </div>
//         </>
//     );
// }


// export default StudentNoticeSearch;