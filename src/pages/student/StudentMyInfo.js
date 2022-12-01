import { useEffect, useState, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callStudentDetailAPI, callStudentUpdateAPI } from '../../api/StudentAPICalls';
import StudentMyInfoCSS from './StudentMyInfo.module.css';

function StudentMyInfo() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const studentDetail = useSelector(state => state.studentMyInfoModuleReducer);
    const studentInfo = studentDetail.memberInfo;
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const imageInput = useRef();
    const params = useParams();
    const [form, setForm] = useState({});

    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    useEffect(
        () => {
            dispatch(callStudentDetailAPI({
            memberCode : params.memberCode
            }));
        },
        []
    );

    useEffect(() => {
        // image 값이 바뀔 때마다 랜더링 -> 파일 첨부가 다시 일어날 때마다 preview 보여주기
        if(image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if(result) {
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    }, 
    [image]);

    
    //console.log(studentInfo.memberCode);
    
    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
           
        });
        console.log(e.target.value);
    }

    /* 이미지 첨부 버튼 클릭 이벤트 */
    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    /* 파일 첨부 시 동작하는 이벤트 */
    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);
    
    }

    /* 수정 모드 변경 이벤트 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            memberCode : studentInfo.memberCode,
            //memberpassword: studentInfo.memberpassword,
            memberName : studentInfo.memberName,
            memberId : studentInfo.memberId,
            memberGender : studentInfo.memberGender,
            memberBirthday : studentInfo.memberBirthday,
            memberPhone : studentInfo.memberPhone,
            memberEmail : studentInfo.memberEmail,
            memberAddress : studentInfo.memberAddress
        });
    }

    /* 수정 버튼 */
    const onClickSubjectUpdateHandler = () => {

        const formData = new FormData();

        formData.append("memberCode", form.memberCode);
        //formData.append("memberpassword", form.memberpassword);
        formData.append("memberName", form.memberName);
        formData.append("memberId", form.memberId);
        formData.append("memberGender", form.memberGender);
        formData.append("memberBirthday", form.memberBirthday);
        formData.append("memberEmail", form.memberEmail);
        formData.append("memberPhone", form.memberPhone);
        formData.append("memberAddress", form.memberAddress);

        if(image) {
            formData.append("memberImage", image);
        }
        
        dispatch(callStudentUpdateAPI({
            form : formData
        }));
        alert('원생정보가 수정되었습니다.');
        //navigate(`/ono/student-manager/${studentInfo.memberCode}`, { replace : true });
        window.location.reload();
    }

    return (
        <>
            <div>
            <div className={ StudentMyInfoCSS.subjectSection }>
                <div className={ StudentMyInfoCSS.subjectInfoDiv }>
                    <table className={ StudentMyInfoCSS.studentTable }>
                    {  studentDetail.memberInfo && studentDetail.lectureList && (  
                    <tbody>
                          <tr>
                                <td>
                            { studentInfo && <img 
                                    className={ StudentMyInfoCSS.productImage } 
                                    src={ (imageUrl == null) ? studentInfo.memberImageUrl : imageUrl } 
                                    alt="preview"
                                />}
                                
                                <input                
                                    style={ { display: 'none' }}
                                    type="file"
                                    name='memberImage' 
                                    accept='image/jpg,image/png,image/jpeg,image/gif'
                                    onChange={ onChangeImageUpload }
                                    ref={ imageInput }
                                />
                                </td>
                                <td>
                                <button 
                                    className={ StudentMyInfoCSS.productImageButton }
                                    onClick={ onClickImageUpload } 
                                    style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    disabled={ !modifyMode }
                                >
                                    이미지 업로드
                                    </button>
                                </td>
                                
                            </tr>
                            <tr>
                                <td><label>이름</label></td>
                                <td><label>생년월일</label></td>

                            </tr>    
                            <tr>
                            <td>
                                    <input 
                                        name='memberName'
                                        placeholder='이름'
                                        className={ StudentMyInfoCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? studentInfo.memberName : form.memberName) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                </td>
                                <td>
                                    <input 
                                        name='memberBirthday'
                                        placeholder='생년월일'
                                        className={ StudentMyInfoCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? studentInfo.memberBirthday : form.memberBirthday) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                </td>
                                
                            </tr>    
                            <tr>
                                <td><label>등록일</label></td>
                                <td><label>아이디</label></td>
                            </tr>
                            <tr>
                            <td>
                                    <label>
                                        <input 
                                            name="noticeRegisterDate"  
                                            placeholder='등록일'
                                            className={ StudentMyInfoCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (studentInfo.memberRegisterDate) || '' }
                                            readOnly={ true }
                                            style={ modifyMode ? { backgroundColor : 'lightgray'} : null }
                                            /> 
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="memberId"  
                                            placeholder='아이디'
                                            className={ StudentMyInfoCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? studentInfo.memberId : form.memberId) || '' }
                                            readOnly={ modifyMode ? false : true }
                                            style={ modifyMode ? { backgroundColor : 'lightgray'} : null }
                                            /> 
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>성별</label></td>
                                <td><label>이메일</label></td>
                            </tr>

                            <tr>
                                
                                <td>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="memberGender"  
                                            onChange={ onChangeHandler } 
                                            value="남성"
                                            readOnly={ modifyMode ? false : true }
                                            checked={ (!modifyMode ? studentInfo.memberGender : form.memberGender) === "남성" ? true : false }
                                        /> 
                                            남성
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="memberGender"  
                                            onChange={ onChangeHandler } 
                                            value="여성"
                                            readOnly={ modifyMode ? false : true }
                                            checked={ (!modifyMode ? studentInfo.memberGender : form.memberGender) === "여성" ? true : false }
                                        /> 여성</label>
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="memberEmail"  
                                            placeholder='이메일'
                                            className={ StudentMyInfoCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? studentInfo.memberEmail : form.memberEmail) || '' }
                                            readOnly={ modifyMode ? false : true }
                                            style={ modifyMode ? { backgroundColor : 'lightgray'} : null }
                                            /> 
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>전화번호</label></td>
                                <td><label>주소</label></td>
                            </tr>

                            <tr>
                                
                                <td>
                                    <label>
                                        <input 
                                            name="memberPhone"  
                                            placeholder='전화번호'
                                            className={ StudentMyInfoCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? studentInfo.memberPhone : form.memberPhone) || '' }
                                            readOnly={ modifyMode ? false : true }
                                            style={ modifyMode ? { backgroundColor : 'lightgray'} : null }
                                            /> 
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="memberAddress"  
                                            placeholder='주소'
                                            className={ StudentMyInfoCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? studentInfo.memberAddress : form.memberAddress) || '' }
                                            readOnly={ modifyMode ? false : true }
                                            style={ modifyMode ? { backgroundColor : 'lightgray'} : null }
                                            /> 
                                    </label>
                                </td>
                            </tr>
                          </tbody>              )}        
                    </table>
                </div>
                <div>
                <table className={ StudentMyInfoCSS.studentClassTable }>
                <colgroup>
                    <col width="40%" />
                    <col width="30%" />
                    <col width="10%" />
                    <col width="15%" />
                    
                </colgroup>
                <thead>
                    <tr>
                        <th>강의명</th>
                        <th>강의실</th>
                        <th>요일</th>
                        <th>시간</th>
                        
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(studentDetail.lectureList) && studentDetail.lectureList.map((m) => (
                        <tr key={m.openClasses.classCode }>
                            <td>{ m.openClasses.className }</td>
                            <td>{ m.openClasses.classRoom }</td>
                            <td>{ m.openClasses.classesScheduleList.map((d) => d.dayName).reduce((ac, v) => ac.includes(v) ? ac : [...ac, v], [] )}</td>
                            <td>{ m.openClasses.classesScheduleList.map((t) => t.timeName)}&nbsp;</td>
                        </tr>
                    )) 
                    }
                </tbody>    
                                    
                </table>
                    </div>
                </div>
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
                        onClick={ onClickSubjectUpdateHandler }
                    >
                        저장하기
                    </button>
                }
                </div>        
            </div>
        </>
        );
    
    }

export default StudentMyInfo;