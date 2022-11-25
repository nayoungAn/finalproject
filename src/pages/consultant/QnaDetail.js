import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callQnaDetailAPI } from "../../api/QnaAPICalls";
import QnaDtailCSS from './QnaDetail.module.css';

function OnaDetai() {
    
    const dispatch = useDispatch();
    const params = useParams();
    const qna = useSelector(state => state.qnaListReducer);
    const qnaDetail = qna.data
    
    useEffect(
        () => {
            console.log('[QnaDetail] MtmCode : ', params.mtmCode);

            dispatch(callQnaDetailAPI({
                mtmCode: params.mtmCode
            }));
        }
        ,[]
    );

    return(
        <>
            <div className={ QnaDtailCSS.qnaDetailtableDiv }>
                <table className={ QnaDtailCSS.qnaDetailtableCss }>
                    <colgroup>
                         <col width="10%" />
                        <col width="50%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                    </colgroup>
                    <tbody>
                            {
                                Array.isArray(qnaDetail) && qnaDetail.map(
                                    (qna) => (
                                        <tr>
                                            <td>{qna.qnaCode}</td>
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

           
        </>
    )

}

export default OnaDetai;