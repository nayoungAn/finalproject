import ConsRegistrationCSS from './ConsRegistration.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callConsRegistAPI } from '../../api/ConsAPICalls';


function ConsRegistration(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        
        consDate : '',
        consName : '',
        consGender : '',
        consBirth : '',
        consTitle: '',
        consDescription : '',
        consPhone : ''
    });

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    /* 상품 등록 버튼 클릭 이벤트 */
    const onClickConsRegistrationHandler = () => {

        const formData = new FormData();

        formData.append("consDate", form.consDate);
        formData.append("consName", form.consName);
        formData.append("consGender", form.consGender);
        formData.append("consBirth", form.consBirth);
        formData.append("consTitle", form.consTitle);
        formData.append("consDescription", form.consDescription);
        formData.append("consPhone", form.consPhone);
       
        dispatch(callConsRegistAPI({
            form : formData
        }));

        alert('과목이 등록되었습니다.');
        //navigate("/ono/cons/consMain", { replace : true });
        window.location.reload();

    }

    return (
        <div>
            <div>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    취소
                </button>
                <button       
                    onClick={ onClickConsRegistrationHandler }             
                >
                    상담 등록
                </button>
            </div>        
            <div className={ ConsRegistrationCSS.subjectSection }>
                <div className={ ConsRegistrationCSS.subjectInfoDiv }>
                    <table>
                        <tbody>
                               <tr>
                                   <th>상담일</th>
                                   <td>
                                       <input 
                                           name='consDate'
                                           placeholder='상담일'
                                           className={ ConsRegistrationCSS.subjectInfoInput }
                                           onChange={ onChangeHandler }
                                      
                                       />
                                   </td>
                               </tr>
                               <tr>
                                   <th>이름</th>
                                   <td>
                                       <input 
                                           name='consName'
                                           placeholder='이름'
                                           className={ ConsRegistrationCSS.subjectInfoInput }
                                           onChange={ onChangeHandler }
                                        
                                       />
                                   </td>
                               </tr>
                               <tr>
                                   <th>성별</th>
                                   <td>
                                       <input 
                                           name='consGender'
                                           placeholder='성별'
                                           className={ ConsRegistrationCSS.subjectInfoInput }
                                           onChange={ onChangeHandler }
                                     
                                       />
                                   </td>
                               </tr>
                               <tr>
                                   <th>생년월일</th>
                                   <td>
                                       <input 
                                           name='consBirth'
                                           placeholder='생년월일'
                                           className={ ConsRegistrationCSS.subjectInfoInput }
                                           onChange={ onChangeHandler }
                                          
                                       />
                                   </td>
                               </tr>
                               <tr>
                                   <th>제목</th>
                                   <td>
                                       <input 
                                           name='consTitle'
                                           placeholder='이름'
                                           className={ ConsRegistrationCSS.subjectInfoInput }
                                           onChange={ onChangeHandler }
                                         
                                       />
                                   </td>
                               </tr>
                               <tr>
                                   <th>전화번호</th>
                                   <td>
                                       <input 
                                           name='consPhone'
                                           placeholder='전화번호'
                                           className={ ConsRegistrationCSS.subjectInfoInput }
                                           onChange={ onChangeHandler }
                                      
                                       />
                                   </td>
                               </tr>
                                <tr>
                                <td><label>내용</label></td>
                                <td colSpan={4}>
                                    <label>
                                        <textarea
                                            name="consDescription"  
                                            placeholder='내용'
                                            className={ ConsRegistrationCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            /> 
                                    </label>
                                </td>
                            </tr>    
                        </tbody>                        
                    </table>
                </div>
            </div>
        </div>
    );

}

export default ConsRegistration;