import NoticeListmoduleCSS from './NoticeList.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { callNoticeListAPI, callNoticeDeleteAPI } from '../../api/NoticeAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';

function NoticeList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notice  = useSelector(state => state.noticeReducer);
    const noticeList = notice.data;
    const [search, setSearch] = useState('');
    console.log('noticeList', noticeList);

    const pageInfo = notice.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];

    if(pageInfo){
        for(let i = pageInfo.startPage ; i <= pageInfo.endPage ; i++){
            pageNumber.push(i);
        }
    }

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

    useEffect(
        () => {
            dispatch(callNoticeListAPI({
                value : search,
                currentPage: currentPage,
            }));
        }
        ,[currentPage, search]
    );
     /* 검색 키워드 입력 시 입력 값 상태 저장 */
     const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    const onClickNoticeInsert = () => {
        navigate("/ono/notice-regist", {replace : false})
    }

    const onClickNoticeDelete = (noticeCode) => {
        {
            dispatch(callNoticeDeleteAPI({
                noticeCode : noticeCode
            }));
            alert('공지사항이 삭제되었습니다.');
                window.location.reload();
        }
    }

    const onClickTableTr = (e, noticeCode) => {
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
            <div className={ NoticeListmoduleCSS.noticeHeader }>
                <h2 className={ NoticeListmoduleCSS.h2}>공지사항</h2>
                    <div className={NoticeListmoduleCSS.search}>
                    
                      <input
                              className={ NoticeListmoduleCSS.InputStyle }
                              type="text"
                              placeholder="검색"
                              value={ search }
                              onChange={ onSearchChangeHandler }
                      />
                <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"></img>
                </div>
            </div>
            
            <table className={ NoticeListmoduleCSS.noticeTable }>
                <colgroup>
                    <col width="5%" />
                    <col width="30%" />
                    <col width="25%" />
                    <col width="20%" />
                    <col width="7%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>제목</th>
                        <th>등록일</th>
                        <th>작성자</th>
                        { decoded === "ROLE_ADMIN" &&
                        <th>삭제</th>
                        }
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
                            <td>{ n.noticeDate.split("00:00:00",1) }</td>
                            <td>{ n.member.memberName }</td>
                            { decoded === "ROLE_ADMIN" &&
                            <td><button className="deleteBtn"
                            >
                                삭제
                            </button></td>
                            }
                        </tr>
                    ))
                    }
                </tbody>
            </table>

                    { decoded === "ROLE_ADMIN" && <button
                            onClick={ onClickNoticeInsert }
                            className={NoticeListmoduleCSS.NoticeBtn }
                        >
                            작성
                        </button>
                    }
        <div style=
        {{ listStyleType: "none",
         display: "flex",
          justifyContent: "center" 
          }}
          >
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
                
                    style={ currentPage === num ?{ color: "#2F65EB", textDecorationLine: "none"  } : null}
                 
                    className={ NoticeListmoduleCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(noticeList) &&
            <button
                className={NoticeListmoduleCSS.pagingBtn}
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
export default NoticeList;