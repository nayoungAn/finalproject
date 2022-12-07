import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation} from "react-router-dom";
import QnaRegistrationCSS from "./QnaRegistration.module.css";
import { useState } from 'react';
import { callQnaResistAPI } from '../../api/QnaAPICalls';


function QnaRegistration() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const qnaDetail = useSelector(state => state.qnaReducer);
    const classes = useSelector(state => state.teacherClassReducer);
   
    console.log('qnaDetail.mtmCode', qnaDetail.mtmCode)
    const [ form, setForm ] = useState({
        mtmCode : qnaDetail.mtmCode,
        reTitle : '',
        reContent :'', 
    });


    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickQnaRegistrationHandler = () => {
        dispatch(callQnaResistAPI({
            form : form
        }));
        window.location.reload();
        alert("답글이 등록되었습니다.")
        navigate(-2);
    }

    return(
        <div>
            <div className={ QnaRegistrationCSS.QnaButtonDiv }>
               
                <div className={ QnaRegistrationCSS.qnaInfoDiv }>
                   <table>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        name='reTitle'
                                        placeholder='제목을 입력하세요'
                                        className={ QnaRegistrationCSS.qnaInfoInput }
                                        onChange={ onChangeHandler }
                                    />    
                                </td>
                            </tr>
                           
                            <tr>
                                <td>
                                    <textarea
                                        name='reContent'
                                        placeholder='내용을 입력하세요'
                                        className={ QnaRegistrationCSS.textAreaStyle }
                                        onChange={ onChangeHandler }
                                    />    
                                </td>
                            </tr>
                        </tbody>
                   </table>
                </div>
                <div className={ QnaRegistrationCSS.buttonDivCss} >   
                <button
                    className={ QnaRegistrationCSS.registBtn }
                    onClick={ onClickQnaRegistrationHandler }
                >
                    등록
                </button>
                <button
                    className={ QnaRegistrationCSS.backBtn }
                    onClick={ () => navigate(-1) }
                >
                    취소
                </button>
                </div>
            </div>
        </div>
    )

    
}


export default QnaRegistration;