import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation} from "react-router-dom";
import QnaRegistrationCSS from "./QnaRegistration.module.css";
import { useState } from 'react';
import { callQnaResistAPI } from '../../api/QnaAPICalls';
import QnaListReducer from "../../modules/QnaListModule";

function QnaRegistration() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useSelector(state => state.teacherClassReducer);
   
    
    const [ form, setForm ] = useState({
        classCode : classes.classCode,
        mtmTitle : '',
        mtmDescription :'' 
    });

    console.log('qna 리듀서', classes);

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
                                        name='mtmTitle'
                                        placeholder='제목을 입력하세요'
                                        className={ QnaRegistrationCSS.qnaInfoInput }
                                        onChange={ onChangeHandler }
                                    />    
                                </td>
                            </tr>
                            <tr >
                                <th>클래스명</th>
                                <td>{ classes.className }</td>
                            </tr>
                            <tr>
                                <td>
                                    <textarea
                                        name='mtmDescription'
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