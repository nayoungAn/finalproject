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
            <div className={ QnaTeacherCSS.qnaTableDiv }>
                <table className={ QnaTeacherCSS.qnaTableCss}>

                    <thead>
                    <colgroup>
                        <col width="4%" />
                        <col width="20%" />
                        <col width="30%" />
                        <col width="15%" />
                        <col width="20%" />
                    </colgroup>
                        <tr>
                            <th>No</th>
                            <th>강의명</th>
                            <th>상담 제목</th>
                            <th>작성자</th>
                            <th>작성날짜</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    
                    <colgroup>
                        <col width="4%"/>
                        <col width="15%" />
                        <col width="30%" />
                        <col width="15%" />
                        <col width="20%" />
                    </colgroup>
                        {
                            Array.isArray(qnaList) && qnaList.map(
                                (qna) => (
                                    <tr
                                        key={ qna.mtmReCode }
                                        onClick={ () => onClickTableTr(qna.mtmCode) }
                                        
                                    >
                                        <td>{ qna.mtmCode }</td>
                                        <td>{ qna.classes.className }</td>
                                        <td>{ qna.mtmTitle }</td>
                                        <td>{ qna.member.memberName }</td>
                                        <td>{ qna.mtmDate }</td>
                                        
                                    <t
                                        key={ qna.mtmReCode }
                                        onClick={ () => onClickReTableTr(qna.mtmCode) }
                                    >
                                        <td className={ QnaTeacherCSS.qnaTbodyCss }>{ qna?.reList?.reCode }</td>
                                        <td className={ QnaTeacherCSS.qnaTd01Css }>{ qna?.reList?.reTitle }</td>
                                        <td className={ QnaTeacherCSS.qnaTd02Css }>{ qna?.reList?.member.memberName }</td>
                                        <td className={ QnaTeacherCSS.qnaTd03Css }>{ qna?.reList?.reDate }</td>
                                        </t>
                                    </tr>
                                   
                                )
                            )
                        }
                         
                    </tbody>
                </table>
            </div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center", marginTop: "80px"}}>
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