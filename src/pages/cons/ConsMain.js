import consCSS from './Cons.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callConsListAPI } from '../../api/ConsAPICalls';
import Cons from "../../components/cons/Cons";

function ConsMain(){

     /* 상품 목록 데이터 조회 */
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
 
     /* 페이징 버튼 */ 
     const pageInfo = cons.pageInfo;
     const pageNumber = [];
     if(pageInfo) {
         for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++){
             pageNumber.push(i);
         }
     }

    return (
        <>
            <div className={ consCSS.productDiv }>
            {
                Array.isArray(consList) 
                && consList.map((cons) => (<Cons key={ cons.consCode } cons={ cons } />))
            }
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