import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';
import StudentQnaRegistrationCSS from "./StudentQnaRegistration.module.css";
import {callQnaRegsistAPI} from "../../api/StudentAPICalls";

function StudentQnaRegistration() {

    const teachers = useSelector(state => state.classListReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    
    const [ form, setForm ] = useState({
        classCode: 0,
        mtmTitle : '',
        mtmDescription :'',
      

    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickQnaRegistrationHandler = () => {

        const formData = new FormData();

        formData.append("mtmTitle", form.mtmTitle);
        formData.append("mtmDescription", form.mtmDescription);

        dispatch(callQnaRegsistAPI({
            form : form,
            subjectCode : form.classCode,
        }));

        navigate(`/ono/tea/qna/${params.classCode}`, {replace:false})
        window.location.reload();
    }

    return(
         
        <div>
            <div>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    취소
                </button>
                <button       
                    onClick={ onClickQnaRegistrationHandler }             
                >
                    1:1상담 등록
                </button>
            </div>        
            <div className={ StudentQnaRegistrationCSS.qnaSection }>
                <div className={ StudentQnaRegistrationCSS.qnaInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>과목명</label></td>
                                <td>
                                    <select
                                        id="subjectList"
                                        name='subjectCode'
                                        placeholder='과목명'
                                        className={ClassRegistrationCSS.classInfoInput}
                                        onChange={onChangeHandler}
                                    >
                                        <option>과목명</option>
                                    {subjects.map((item,idx) => (
                                    <option key={idx} name='subjectCode' value={item?.subjectCode} >
                                      {item?.subjectName}
                                    </option>
                                  ))}
                                    </select>
                                </td>
                            </tr>
                               <tr>
                                   <th>제목</th>
                                   <td>
                                       <input 
                                           name='mtmTitle'
                                           placeholder='상담일'
                                           className={ StudentQnaRegistrationCSS.qnaInfoInput }
                                           onChange={ onChangeHandler }
                                      
                                       />
                                   </td>
                               </tr>
                               <tr>
                                   <th>내용</th>
                                   <td>
                                       <input 
                                           name='mtmDescription'
                                           placeholder='이름'
                                           className={ StudentQnaRegistrationCSS.qnaInfoInput }
                                           onChange={ onChangeHandler }
                                        
                                       />
                                   </td>
                                </tr>
                        </tbody>                        
                    </table>
                </div>
            </div>
        </div>
    
    );

    
}
export default StudentQnaRegistration;