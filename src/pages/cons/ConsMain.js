import consCSS from './ConsMain.module.css';
import { callConsListAPI } from '../../api/ConsAPICalls';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";


function ConsMain(){

     /* 상품 목록 데이터 조회 */
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const cons = useSelector(state => state.consReducer);
     const consList = cons.data;
     const [currentPage, setCurrentPage] = useState(1);

     
     useEffect(
         () => {
             dispatch(callConsListAPI({
                 currentPage : currentPage
             }));
         }
         , [currentPage]
     );
     /* 상세 목록 */ 
     const onClickTable = (c, consCode) => {

        console.log(c.target.className);
        
        if(c.target.className != "deleteBtn")
                {
                    navigate(`/ono/Cons/consdetail/${consCode}`, { replace: false })
                    console.log("상세조회");
                }     
        else {
            //onClickSubjectDelete(consCode);
        }
    }
     /* 페이징 버튼 */ 
     const pageInfo = cons.pageInfo;
     const pageNumber = [];
     if(pageInfo) {
         for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++){
             pageNumber.push(i);
         }
     }
     
    const onClickConsInsert = () => {
        console.log('[SubjectManagement] onClickSubjectInsert');
        navigate("/ono/cons/cons-registration", { replace: false })
    }

    return (
        <>
            <h3>등록상담</h3>
             <div className={ consCSS.bodyDiv }>  
            <table className={ consCSS.consTable }>
                <colgroup>
                    <col width="5%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="35%" />
                    <col width="45%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>상담일</th>
                        <th>이름</th>
                        <th>제목</th>
                        <th>내용</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(consList) && consList.map((c) => (
                        <tr
                            key={ c.consCode }
                            onClick={ (event) => onClickTable(event, c.consCode) }
                        >
                            <td>{  c.consCode }</td>
                            <td>{ c.consDate.split(' 00:00:00',1) }</td>
                            <td>{ c.consName }</td>
                            <td>{ c.consTitle }</td>
                            <td>{ c.consDescription }</td>
                        </tr>
                    )) 
                    }
                </tbody>                    
            </table> 
            <div>
                <button
                    onClick={ onClickConsInsert }
                >
                    상담 등록
                </button>
            </div>                  
            
        </div>
            <div style={ { listStyleType: 'none', display: 'flex'} }>
            {
                Array.isArray(consList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage - 1) }
                    disabled={ currentPage === 1}
                    className={ consCSS.pagingBtn }
                >
                    &lt;
                </button>
            }
            {
                pageNumber.map((num) => (
                    <li key={num} onClick={ () => setCurrentPage(num)}>
                        <button
                            style={ currentPage === num ? { backgroundColor : 'orange'} : null }
                            className={ consCSS.pagingBtn} 
                        >
                            {num}
                        </button>
                    </li>
                ))

            }
            {
                Array.isArray(consList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage + 1) }
                    disabled={ currentPage === pageInfo.endPage }
                    className={ consCSS.pagingBtn }
                >
                    &gt;
                </button>
            }
             
            </div>
           
        </>
    );

}

export default ConsMain;