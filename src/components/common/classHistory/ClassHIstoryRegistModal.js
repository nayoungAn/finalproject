import ClassHistoryCSS from './ClassHistoryModal.module.css';
import { useState } from "react";
import { useDispatch } from 'react-redux';

function ClassHistoryRegistModal({setClassHistoryRegistModal}) {

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        classCode: 0,
        memberCode: 0,
        classStatus : '',
        startDate : '',
    });
    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    
    const onClickRegistHandler = () => {
        window.localStorage.removeItem('accessToken');
        
        dispatch(callClassHistoryRegistAPI({	
            form: form
        }));

        setClassHistoryRegistModal(false);
        alert('수강등록이 완료되었습니다.');
        window.location.reload();
    }
    
    return (        
        <div className={ClassHistoryCSS.modal}>
            <div className={ ClassHistoryCSS.modalContainer }>
                <div className={ ClassHistoryCSS.loginModalDiv }>
                <table>
                    { Array.isArray(subjects) && (
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
                                        key={uuid()}
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
                                <td><label> 강의명</label></td>
                                <td>
                                    <input
                                        name='className'
                                        placeholder='강의명'
                                        className={ClassRegistrationCSS.classInfoInput}
                                        onChange={onChangeHandler}
                                    />
                                </td>
                                </tr>
                                <tr>
                            </tr>
                            <tr>
                                <td><label>수강 정원</label></td>
                                <td>
                                    <input
                                        name='classQuota'
                                        placeholder='수강 정원'
                                        className={ClassRegistrationCSS.classInfoInput}
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><label>수업일</label></td>
                                <td>
                                    <label>
                                        <input
                                            name="classStartDate"
                                            placeholder='2022-10-15'
                                            className={ClassRegistrationCSS.classInfoInput}
                                            onChange={onChangeHandler}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        <input
                                            name="classEndDate"
                                            placeholder='2022-10-15'
                                            className={ClassRegistrationCSS.classInfoInput}
                                            onChange={onChangeHandler}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>수업료</label></td>
                                <td>
                                    <label>
                                        <input
                                            name="classPrice"
                                            placeholder='800000'
                                            className={ClassRegistrationCSS.classInfoInput}
                                            onChange={onChangeHandler}
                                        />
                                    </label>
                                </td>
                            </tr>
                        

                        </tbody> )}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ClassHistoryRegistModal;