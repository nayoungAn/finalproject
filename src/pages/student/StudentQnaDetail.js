import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callQnaDetailAPI } from "../../api/StudentAPICalls";
import StudentQnaDtailCSS from './StudentQnaDetail.module.css';

function StudentQnaDetail() {
    
    const dispatch = useDispatch();
    const params = useParams();
    const qna = useSelector(state => state.studentQnaReducer);
    
    
    
    useEffect(
        () => {
            console.log('[QnaDetail] MtmCode : ', params.mtmCode);

            dispatch(callQnaDetailAPI({
                mtmCode: params.mtmCode
                
            }));
        }
        ,[]
    );
    console.log('[QnaDetail] qna : ', qna);
    

    return(

        <>
            <div className={ StudentQnaDtailCSS.qnaDetailtableDiv }>
                <table className={ StudentQnaDtailCSS.qnaDetailtableCss }>
                    <tbody>   
                       <tr>
                            <th>{ qna.mtmCode }  </th>
                            <th>{ qna.mtmTitle } </th>
                            <th>{ qna.mtmDate }  </th>
                    
                            <td> { qna.mtmDescription } </td>
                        </tr>
                    </tbody> 
                </table>
            </div>
        
        </>
    )

}

export default StudentQnaDetail;