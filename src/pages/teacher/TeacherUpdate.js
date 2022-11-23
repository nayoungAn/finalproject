import TeacherUpdateCSS from './TeacherUpdate.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callTeacherUpdateAPI } from '../../api/TeacherAPICall';
import { callTeacherDetailForAdminAPI } from '../../api/TeacherListAPICall';
function ProductUpdate(){

    const params = useParams();
    const teacherDetail = useSelector(state => state.teacherListReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [form, setForm] = useState({});

    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 최초 랜더링 시 상품 상세 정보 조회 */
    useEffect(()=> {
        dispatch(callTeacherDetailForAdminAPI({
            memberCode : params.memberCode
        }));
    },
     []);

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

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
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
            memberCode : teacherDetail.memberCode,
            memberName : teacherDetail.memberName,
            memberPhone : teacherDetail.memberPhone,
            memberGender : teacherDetail.memberGender,
            memberBirthday: teacherDetail.memberBirthday,
            memberEmail : teacherDetail.memberEmail,
            memberStatus : teacherDetail.memberStatus,
            memberAddress : teacherDetail.memberAddress,
            memberRegisterDate : teacherDetail.memberRegisterDate,
        });
    }

    /* 강사 수정 저장 버튼 클릭 이벤트 */
    const onClickTeacherUpdateHandler = () => {

        const formData = new FormData();

        formData.append("memberCode", form.memberCode);
        formData.append("memberName", form.memberName);
        formData.append("memberPhone", form.memberPhone);
        formData.append("memberGender", form.memberGender);
        formData.append("memberBirthday", form.memberBirthday);
        formData.append("memberEmail", form.memberEmail);
        formData.append("memberStatus", form.memberStatus);
        formData.append("memberAddress", form.memberAddress);
        formData.append("memberRegisterDate", form.memberRegisterDate);
        

        if(image) {
            formData.append("memberImage", image);
        }

        dispatch(callTeacherUpdateAPI({
            form : formData
        }));

        alert('강사가 수정되었습니다.');
        navigate('/ono/teacher', { replace : true });
        window.location.reload();
    }

    return (
        <div>
            <div >
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
                    onClick={ onClickTeacherUpdateHandler }
                >
                    강사 수정 저장하기
                </button>
            }
            </div>        
            <div className={ TeacherUpdateCSS.teacherSection }>
                <div className={ TeacherUpdateCSS.teacherInfoDiv }>
                    <div className={ TeacherUpdateCSS.teacherImageDiv }>
                        { teacherDetail && <img 
                            className={ TeacherUpdateCSS.teacherImage } 
                            src={ (imageUrl == null) ? teacherDetail.memberImageUrl : imageUrl } 
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
                        <button 
                            className={ TeacherUpdateCSS.teacherImageButton }
                            onClick={ onClickImageUpload } 
                            style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                            disabled={ !modifyMode }
                        >
                            이미지 업로드
                            </button>
                    </div>
                </div>
                <div className={ TeacherUpdateCSS.teacherInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>이름</label></td>
                                <td>
                                    <input 
                                        name='memberName'
                                        placeholder='강사 이름'
                                        className={ TeacherUpdateCSS.teacherInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? teacherDetail.memberName : form.memberName) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>생년월일</label></td>
                                <td>
                                    <input 
                                        name='memberBirthday'
                                        placeholder='19960525'
                                        className={ TeacherUpdateCSS.teacherInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? teacherDetail.memberBirthday : form.memberBirthday) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>성별</label></td>
                                <td>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="memberGender"  
                                            onChange={ onChangeHandler } 
                                            value="여성"
                                            readOnly={modifyMode ? false : true }
                                            checked={ (!modifyMode ? teacherDetail?.memberGender : form.memberGender) === '여성' ? true : false }
                                        /> 
                                            여성
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="memberGender"  
                                            onChange={ onChangeHandler } 
                                            value="남성"
                                            readOnly={modifyMode ? false : true }
                                            checked={ (!modifyMode ? teacherDetail?.memberGender : form.memberGender) === '남성' ? true : false }
                                        /> 남성</label>
                                </td>
                            </tr>    
                            <tr>
                                <td><label>입사일</label></td>
                                <td>
                                    <input 
                                        name='memberRegisterDate'
                                        className={ TeacherUpdateCSS.teacherInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? teacherDetail.memberRegisterDate : form.memberRegisterDate) || '' }
                                        readOnly={ true }
                                        style={ { backgroundColor : 'gray'} }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>이메일</label></td>
                                <td>
                                    <input 
                                        name='memberEmail'
                                        placeholder='asd@asd.com'
                                        className={ TeacherUpdateCSS.teacherInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? teacherDetail.memberEmail : form.memberEmail) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>근무상태</label></td>
                                <td>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="memberStatus"  
                                            onChange={ onChangeHandler } 
                                            value='Y'
                                            readOnly={modifyMode ? false : true }
                                            checked={ (!modifyMode ? teacherDetail?.memberStatus : form.memberStatus) === 'Y' ?  true : false }
                                        /> 
                                            근무
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="memberStatus" 
                                            onChange={ onChangeHandler } 
                                            value='N'
                                            readOnly={modifyMode ? false : true }
                                            checked={ (!modifyMode ? teacherDetail?.memberGender : form.memberGender) === 'N' ?  true : false}
                                        /> 퇴사</label>
                                </td>
                            </tr>   
                            
                            <tr>
                                <td><label>휴대번호</label></td>
                                <td>
                                    <input 
                                        name='memberPhone'
                                        placeholder='010-1234-5678'
                                        className={ TeacherUpdateCSS.teacherInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? teacherDetail.memberPhone : form.memberPhone) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>주소</label></td>
                                <td>
                                    <input 
                                        name='memberAddress'
                                        placeholder='서울시 은평구'
                                        className={ TeacherUpdateCSS.teacherInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? teacherDetail.memberAddress : form.memberAddress) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
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

export default ProductUpdate;