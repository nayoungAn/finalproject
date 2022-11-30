import { useDispatch,useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import StudentQnaRegistrationCSS from "./StudentQnaRegistration.module.css";
import {callQnaRegsistAPI} from "../../api/StudentAPICalls";
import { callClassHistoryListForMemberNoPagingAPI } from '../../api/StudentAPICalls';

function StudentQnaRegistration() {

    const classes = useSelector(state => state.studentQnaReducer);
    const classesList = classes.data;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();


    useEffect(
        () => {
            dispatch(callClassHistoryListForMemberNoPagingAPI({
            }));
        }, []
    );

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
            classCode : form.classCode,
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
                    { Array.isArray(classesList) && (
                        <tbody>
                            <tr>
                                <td><label>과목명</label></td>
                                <td>
                                    <select
                                        id="classList"
                                        name='classCode'
                                        placeholder='과목명'
                                        className={StudentQnaRegistrationCSS.qnaInfoInput}
                                        onChange={onChangeHandler}
                                    >
                                        <option>과목명</option>
                                    {classesList.map((item,idx) => (
                                    <option key={idx} name='classCode' value={item?.classes.classCode} >
                                      {item?.classes?.className}
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
                        </tbody>)}                        
                    </table>
                </div>
            </div>
        </div>
    
    );

    
}
export default StudentQnaRegistration;