import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { callQnaListAPI } from "../../api/QnaAPICalls";
import QnaTeacherCSS from './QnaTeacher.module.css';
function QnaTeacher() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [ currentPage, setCurrentPage ] = useState(1);
    const qna = useSelector(state => state.qnaListReducer);
    const qnaList = qna.data;
    const pageInfo = qna.pageInfo;

    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callQnaListAPI({
                classCode : params.classCode,
                currentPage : currentPage
            }));
        }
        ,[currentPage]
    )

    const onClickTableTr = (mtmCode) => {
        navigate(`/qnaDetail/${mtmCode}`, { replace : false });
    }

    return(
        <>  
            <div className={ QnaTeacherCSS.qnaTableDiv }>
                <table className={ QnaTeacherCSS.qnaTableCss}>
                    <colgroup>
                        <col width="3%" />
                        <col width="20%" />
                        <col width="40%" />
                        <col width="15%" />
                        <col width="50%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>강의명</th>
                            <th>상담 제목</th>
                            <th>작성자</th>
                            <th>작성날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(qnaList) && qnaList.map(
                                (qna) => (
                                    <tr
                                        key={ qna.mtmCode }
                                        onClick={ () => onClickTableTr(qna.mtmCode) }
                                    >
                                        <td>{ qna.mtmCode }</td>
                                        <td>{ qna.classes.className }</td>
                                        <td>{ qna.mtmTitle }</td>
                                        <td>{ qna.member.memberName }</td>
                                        <td>{ qna.mtmDate }</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center"}}>
                {
                    Array.isArray(qnaList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage - 1) }
                        disabled={ currentPage === 1 }
                        className={ QnaTeacherCSS.pageBtn}
                    >
                         &lt;
                    </button>    
                }
                    {
                pageNumber.map((num) => (
                    <li key={num} onClick={ () => setCurrentPage(num) }>
                        <button
                            style={ currentPage === num ? { backgroundColor : 'orange'} : null }
                            className={ QnaTeacherCSS.pagingBtn }
                        >
                            {num}
                        </button>
                    </li>
                ))
            }
            {
                Array.isArray(qnaList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage + 1) }
                    disabled={ currentPage === pageInfo.maxPage || pageInfo.endPage === 1 }
                    className={ QnaTeacherCSS.pagingBtn }
                >
                    &gt;
                </button>
            } 
            </div>
           
        </>
    );

}

export default QnaTeacher;