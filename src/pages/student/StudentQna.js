import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { callQnaListAPI } from "../../api/StudentAPICalls";
import StudentQnaCSS from './StudentQna.module.css';
import HeaderCSS from "../../components/common/Header";
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

function StudentQna() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [ currentPage, setCurrentPage ] = useState(1);
    const qna = useSelector(state => state.studentQnaReducer);
    const qnaList = qna.data;
    const pageInfo = qna.pageInfo;
    const [searchvalue, searchsetvalue] = useState('');
    console.log('value', searchvalue);
    console.log('subjectManagement', qnaList);
   

  
    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callQnaListAPI({
                searchvalue : searchvalue,
                currentPage : currentPage
            }));
        }
        ,[currentPage, searchvalue]
    )

    const onClickTableTr = (mtmCode) => {
        navigate(`/ono/student/studentQnadetail/${mtmCode}`, { replace : false });
    }

    const onClickReTableTr = (mtmCode) => {
        navigate(`/ono/student/studentReQnadetail/${mtmCode}`, { replace : false });
    }



    const onClickQnaInsert = () => {
        console.log('[SubjectManagement] onClickSubjectInsert');
        navigate(`/ono/student/studentQnaRegistration`, { replace: false })
    }

    
       /* 검색 키워드 입력 시 입력 값 상태 저장 */
       const onSearchChangeHandler = (e) => {
        searchsetvalue(e.target.value);
    }
    
    return(
        <>  
            <div> <h3>1:1 상담 </h3></div>
            <div className={ StudentQnaCSS.qnaTableDiv }>
            <div className={StudentQnaCSS.search}>
            <input
                    className={ StudentQnaCSS.InputStyle }
                    type="text"
                    placeholder="검색"
                    value={ searchvalue }
                    onChange={ onSearchChangeHandler }
                    
            />
             <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"></img>
           
            </div>
                <table className={ StudentQnaCSS.qnaTableCss}>
                    <colgroup>
                        <col width="5%" />
                        <col width="30%" />
                        <col width="35%" />
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
                                <>
                                    <tr
                                        key={ qna.mtmCode }
                                        onClick={ () => onClickTableTr(qna.mtmCode) }
                                        
                                    >
                                        <td>{ qna.mtmCode }</td>
                                        <td>{ qna.classes.className }</td>
                                        <td>{ qna.mtmTitle }</td>
                                        <td>{ qna.member.memberName }</td>
                                        <td>{ qna.mtmDate?.split("T",1) }</td>
                                     
                                    </tr>
                                        <tr 
                                        key={ qna?.reList?.reCode }
                                        onClick={ () => onClickReTableTr(qna?.reList?.reCode)}>
                                        <td>{ qna?.reList?.reCode }</td>
                                        <td></td>
                                        <td>{ qna?.reList?.reTitle }</td>
                                        <td>{ qna?.reList?.member.memberName }</td>
                                        <td>{ qna?.reList?.reDate.split(" 00:00:00",1) }</td>
                                       
                                 </tr>
                                 </>    
                                )

                            )

                        }
                        
                       
                        
                    </tbody>
                </table>
                <button
                    className={ StudentQnaCSS.registBtn}
                    onClick={ onClickQnaInsert }
                >
                    상담 등록
                </button>
                
            </div>
            
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center"}}>
                
                {
                    Array.isArray(qnaList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage - 1) }
                        disabled={ currentPage === 1 }
                        className={ StudentQnaCSS.pagingBtn}
                    >
                         &lt;
                    </button>    
                }
                    {
                pageNumber.map((num) => (
                    <li key={num} onClick={ () => setCurrentPage(num) }>
                        <button
                            style={ currentPage === num ? { backgroundColor : 'transparent'} : null }
                            className={ StudentQnaCSS.pagingBtn }
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
                    className={ StudentQnaCSS.pagingBtn }
                >
                    &gt;
                </button>
            } 
            </div>
           
        </>
    );

}

export default StudentQna;