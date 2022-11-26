import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callQnaDetailAPI } from "../../api/QnaAPICalls";
import QnaDtailCSS from './QnaDetail.module.css';

function OnaDetai() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
  
    const onClickHandler = () => {
        navigate(`/ono/tea/qnaReply`, { replace : false });
    }


    return(

        <>
            <button
                onClick={ onClickHandler }
            >
                답글 등록~
            </button>
            <div className={ QnaDtailCSS.qnaDetailtableDiv }>
                <table className={ QnaDtailCSS.qnaDetailtableCss }>
                    <tbody>   
                       <tr>
                            <ht> 왜 안나오냐</ht>
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