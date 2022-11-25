import NoticeListmoduleCSS from './NoticeList.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { callNoticeListAPI, callNoticeDeleteAPI } from '../../api/NoticeAPICalls';

function NoticeList() {

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

    const onClickNoticeInsert = () => {
        navigate("/ono/notice", {replace : false})
    }

    const onClickNoticeDelete = (noticeCode) => {
        console.log('[SubjectManagement] onClickSubjectDelete');
        {
            dispatch(callNoticeDeleteAPI({
                noticeCode : noticeCode
            }));
            console.log("삭제");
            alert('공지사항이 삭제되었습니다.');
                window.location.reload();
        }
    }

    const onClickTableTr = (e, noticeCode) => {

        console.log(e.target.className);
        
        if(e.target.className !== "deleteBtn")
                {
                    navigate(`/ono/notice/${noticeCode}`, { replace: false })
                    console.log("상세조회");
                }     
        else {
            onClickNoticeDelete(noticeCode);
        }
    }

    return (
        <>
        <div className={ NoticeListmoduleCSS.bodyDiv }>
            <div>
                <button
                    onClick={ onClickNoticeInsert }
                >
                    작성하기
                </button>
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


export default NoticeList;