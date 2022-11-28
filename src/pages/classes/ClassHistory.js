// import MainCSS from './Main.module.css';
import ClassHistoryCSS from "./ClassHistory.module.css";
import ClassHistoryItem from '../../components/classHistory/ClassHistoryItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callStudentManagerListNoPagingAPI} from '../../api/StudentManagerAPICalls'
function ClassHistory() {

    /* 상품 목록 데이터 조회 */
    const dispatch = useDispatch();
    const classHistory = useSelector(state => state.studentManagerReducer);
    // const productList = products.data;

    useEffect(
        () => {
            dispatch(callStudentManagerListNoPagingAPI({
            }));
        }
        , []
    );
    
    return (
        <>
            <div className={ClassHistoryCSS.main}>
                <div className={ClassHistoryCSS.item1}>            
                        <h4>원생 이름&emsp;&emsp;휴대전화</h4>
                {
                
                    Array.isArray(classHistory) 
                    && classHistory.map((member) => (<ClassHistoryItem key={ member.memberCode } member={ member } />))
                }</div>
                <div className={ClassHistoryCSS.item2}>
                    <h4>원생 정보</h4>
                </div>
            </div>
           
        </>
    );
}

export default ClassHistory;