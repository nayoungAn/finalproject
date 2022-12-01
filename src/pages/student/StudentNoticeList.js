import NoticeListmoduleCSS from './StudentNoticeList.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { callNoticeListAPI, callNoticeDeleteAPI } from '../../api/NoticeAPICalls';

function StudentNoticeList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notice  = useSelector(state => state.noticeReducer);      
    const noticeList = notice.data;
    console.log('noticeList', noticeList);

    const pageInfo = notice.pageInfo;

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
            dispatch(callNoticeListAPI({
                currentPage: currentPage,
            }));            
            
        }
        ,[currentPage]    
    );

    
    const onClickTableTr = (e, noticeCode) => {

        console.log(e.target.className);
        
        if(e.target.className !== "deleteBtn")
                {
                    navigate(`/ono/student/studentNoticeDetail/${noticeCode}`, { replace: false })
                    console.log("상세조회");
                }     
       
    }

    return (
        <>
        <div className={ NoticeListmoduleCSS.bodyDiv }>
            <div>
               
            </div>            
            <table className={ NoticeListmoduleCSS.teacherTable }>
                <colgroup>
                    <col width="5%" />
                    <col width="55%" />
                    <col width="10%" />
                    <col width="30%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>등록일</th>
                        <th>작성자</th>
                        
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(noticeList) && noticeList.map((n) => (
                        <tr
                            key={ n.noticeCode }
                            onClick={ (event) => onClickTableTr(event, n.noticeCode) }
                        >
                            <td>{ n.noticeCode }</td>
                            <td>{ n.noticeTitle }</td>
                            <td>{ n.noticeDate }</td>
                            <td>{ n.member.memberName }</td>
                
                        </tr>
                    )) 
                    }
                </tbody>    
                                    
            </table>         
            
        </div>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(noticeList) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className={ NoticeListmoduleCSS.pagingBtn }
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                    className={ NoticeListmoduleCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(noticeList) &&
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


export default StudentNoticeList;