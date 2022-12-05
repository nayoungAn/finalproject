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
        navigate(`/ono/tea/qna/${classes.classCode}`, { replace : false });
    }

    return(
        <div>
            <div className={ QnaRegistrationCSS.QnaButtonDiv }>
                <button
                    onClick={ () => navigate(-1) }
                >
                    돌아가기
                </button>
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
                <button
                    onClick={ onClickQnaRegistrationHandler }
                >
                    답변등록
                </button>
            </div>
        </div>
    )

    
}

export default QnaRegistration;