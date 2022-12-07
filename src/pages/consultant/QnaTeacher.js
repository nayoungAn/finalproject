import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { callQnaListAPI } from "../../api/QnaAPICalls";
import QnaTeacherCSS from './QnaTeacher.module.css';
function QnaTeacher() {
    
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        navigate(`/ono/tea/qnaDetail/${mtmCode}`, { replace : false });
    }
    const onClickReTableTr = (reCode) => {
        navigate(`/ono/tea/qnaReDetail/${reCode}`, { replace : false });
    }

    return(
        <>  
           <table className={QnaTeacherCSS.classtable}>
                <thead className={QnaTeacherCSS.classhead}>
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
                            <>
                                <tr
                                    key={ qna.mtmReCode }
                                    onClick={ () => onClickTableTr(qna.mtmCode) }
                                        
                                >
                                    <td>{ qna.mtmCode }</td>
                                    <td>{ qna.classes.className }</td>
                                    <td>{ qna.mtmTitle }</td>
                                    <td>{ qna.member.memberName }</td>
                                    <td>{ qna.mtmDate.split("T",1) }</td>
                                </tr>    
                                  
                                <tr 
                                    key={ qna?.reList?.reCode }
                                    onClick={ () => onClickReTableTr(qna?.reList?.reCode)}>
                                    <td>{ qna?.reList?.reCode }</td>
                                    <br/>
                                    <td>{ qna?.reList?.reTitle }</td>
                                    <td>{ qna?.reList?.member.memberName }</td>
                                    <td>{ qna?.reList?.reDate }</td>
                                      
                                </tr>
                            </>
                                )
                            )
                        }
                         
                    </tbody>
                </table>
       
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center", marginTop: "80px"}}>
                {
                    Array.isArray(qnaList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage - 1) }
                        disabled={ currentPage === 1 }
                        className={ QnaTeacherCSS.pagingBtn}
                    >
                         &lt;
                    </button>    
                }
                    {
                pageNumber.map((num) => (
                    <li key={num} onClick={ () => setCurrentPage(num) }>
                        <button
                            style={ currentPage === num ? { color: "#2F65EB"} : null }
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