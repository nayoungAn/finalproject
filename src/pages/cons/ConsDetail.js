import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callConsDetailAPI } from '../../api/ConsAPICalls';
import ConsDetailCSS from './ConsDetail.module.css';

import { callConsUpdateAPI } from '../../api/ConsAPICalls';

function ConsDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cons = useSelector(state => state.consReducer);
    const params = useParams();
    const consCode = params.consCode;

    const [form, setForm] = useState({});
    const [modifyMode, setModifyMode] = useState(false);


    useEffect(
       
        () => {
            dispatch(callConsDetailAPI({
                consCode : params.consCode
                
            }));
        },
        []
    );

     /* 입력 양식의 값 변경될 때 */
     const onChangeHandler = (e) => {
        //setModifyMode(true)
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
     
      
    }

     /* 수정 모드 변경 이벤트 */
     const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            consCode : cons.consCode,
            consDate : cons.consDate,
            consName : cons.consName,
            consGender : cons.consGender,
            consBirth : cons.consBirth,
            consTitle: cons.consTitle,
            consDescription : cons.consDescription,
            consPhone : cons.consPhone
          
        });
    }
   
     /* 상품 수정 저장 버튼 클릭 이벤트 */
     const onClickConsUpdateHandler = () => {
        
        
        const formData = new FormData();

        formData.append("consCode", form.consCode);
        formData.append("consDate", form.consDate);
        formData.append("consName", form.consName);
        formData.append("consGender", form.consGender);
        formData.append("consBirth", form.consBirth);
        formData.append("consTitle", form.consTitle);
        formData.append("consDescription", form.consDescription);
        formData.append("consPhone", form.consPhone);
        console.log(cons.consCode);
        console.log(form.consCode);
        console.log(form.consDate);
    
        dispatch(callConsUpdateAPI({
            form : formData
        }));
        alert('과목이 수정되었습니다.');
        navigate('/ono/Cons/consMain', { replace : true });
    }

    return (
        <>
            
            <div className={ ConsDetailCSS.DetailDiv } >
                <div className={ ConsDetailCSS.descriptionDiv }>
                    <table className={ ConsDetailCSS.descriptionTable }>
                        <tbody>
                            <tr>
                               
                            </tr>
                            <tr>
                                <th>상담일</th>
                                <td>
                                    <input 
                                        name='consDate'
                                        placeholder='상담일'
                                        className={ ConsDetailCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? cons.consDate : form.consDate || cons.consDate  }
                                        //readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : ''} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td>
                                    <input 
                                        name='consName'
                                        placeholder='이름'
                                        className={ ConsDetailCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? cons.consName : form.consName}
                                        //readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : ''} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>성별</th>
                                <td>
                                    <input 
                                        name='consGender'
                                        placeholder='이름'
                                        className={ ConsDetailCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? cons.consGender : form.consGender}
                                        //readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : ''} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>생년월일</th>
                                <td>
                                    <input 
                                        name='consBirth'
                                        placeholder='이름'
                                        className={ ConsDetailCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? cons.consBirth : form.consBirth }
                                        //readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : ''} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td>
                                    <input 
                                        name='consTitle'
                                        placeholder='이름'
                                        className={ ConsDetailCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? cons.consTitle : form.consTitle  }
                                        //readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : ''} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td>
                                    <input 
                                        name='consDescription'
                                        placeholder='이름'
                                        className={ ConsDetailCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? cons.consDescription : form.consDescription }
                                        //readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : ''} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>전화번호</th>
                                <td>
                                    <input 
                                        name='consPhone'
                                        placeholder='이름'
                                        className={ ConsDetailCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? cons.consPhone : form.consPhone }
                                       // readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : ''} : null }
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
            {!modifyMode &&
                <button 
                    onClick={ onClickModifyModeHandler }
                >
                    수정 모드
                </button>
            }
            {modifyMode &&
                <button 
                    onClick={ onClickConsUpdateHandler }
                >
                    상담 수정 저장하기
                </button>
            }
            </div>        
                </div>
            </div>
        </>
    );

}

export default ConsDetail;