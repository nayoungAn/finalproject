import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callQnaDetailAPI } from "../../api/QnaAPICalls";
import QnaDtailCSS from './QnaDetail.module.css';

function OnaDetai() {
    
    const dispatch = useDispatch();
    const params = useParams();
    const qna = useSelector(state => state.qnaListReducer);
    
    
    
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
            <div className={ QnaDtailCSS.qnaDetailtableDiv }>
                <table className={ QnaDtailCSS.qnaDetailtableCss }>
                    <tbody>   
                       <tr>
                            <th>{ qna.mtmCode }  </th>
                            <th>{ qna.mtmTitle } </th>
                            <th>{ qna.mtmDate }  </th>
                        </tr>
                        <tr>
                            <td> { qna.mtmDescription } </td>
                        </tr>
                    </tbody> 
                </table>
            </div>
        
        </>
    )

}

export default OnaDetai;