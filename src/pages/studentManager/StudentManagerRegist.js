import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callStudentManagerRegistAPI, callStudentManagerUpdateAPI } from '../../api/StudentManagerAPICalls';
import StudentManagerRegistCSS from './StudentManagerRegist.module.css';

function StudentManagerRegist() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [form, setForm] = useState({
        memberId : '',
        memberPassword : '',
        memberName : '',
        memberPhone : '',
        memberBirthday : '',
        memberGender : '',
        memberAddress : '',
        memberStatus : '',
        memberEmail : ''
        
    });

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

    /* 원생 등록 버튼 클릭 이벤트 */
    const onClickStudentRegistHandler = () => {

        const formData = new FormData();

        formData.append("memberId", form.memberId);
        formData.append("memberName", form.memberName);
        formData.append("memberPassword", form.memberPassword);
        formData.append("memberPhone", form.memberPhone);
        formData.append("memberBirthday", form.memberBirthday);
        formData.append("memberGender", form.memberGender);
        formData.append("memberAddress", form.memberAddress);
        formData.append("memberStatus", form.memberStatus);
        formData.append("memberEmail", form.memberEmail);
        
        if(image) {
            formData.append("memberImage", image);
        }   

        dispatch(callStudentManagerRegistAPI({
            form : formData
        }));
        alert('원생정보가 등록되었습니다.');
        navigate(`/ono/student-manager`, { replace : true });
        window.location.reload();
    }


    return (
        <>
            <div>
            <div className={ StudentManagerRegistCSS.subjectSection }>
                <div className={ StudentManagerRegistCSS.subjectInfoDiv }>
                    <div className={ StudentManagerRegistCSS.productImageDiv }>
                        { imageUrl && <img 
                            className={ StudentManagerRegistCSS.productImage } 
                            src={ imageUrl } 
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
                            className={ StudentManagerRegistCSS.productImageButton }
                            onClick={ onClickImageUpload } 
                        >
                            이미지 업로드
                            </button>
                    </div>
                    <table className={ StudentManagerRegistCSS.studentTable }>
                        <tbody>
                            <tr>
                                <td><label>이름</label></td>
                                <td><label>생년월일</label></td>

                            </tr>    
                            <tr>
                            <td>
                                    <input 
                                        name='memberName'
                                        placeholder='이름'
                                        className={ StudentManagerRegistCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                                <td>
                                    <input 
                                        name='memberBirthday'
                                        placeholder='생년월일'
                                        className={ StudentManagerRegistCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                                
                            </tr>    
                            <tr>
                                <td><label>상태</label></td>
                                <td><label>아이디</label></td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="memberStatus"  
                                            onChange={ onChangeHandler } 
                                            value="Y"
                                        /> 
                                            등원
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="memberStatus"  
                                            onChange={ onChangeHandler } 
                                            value="N"
                                        /> 퇴원</label>
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="memberId"  
                                            placeholder='아이디'
                                            className={ StudentManagerRegistCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
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
                                        /> 
                                            남성
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="memberGender"  
                                            onChange={ onChangeHandler } 
                                            value="여성"
                                        /> 여성</label>
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="memberEmail"  
                                            placeholder='이메일'
                                            className={ StudentManagerRegistCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
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
                                            className={ StudentManagerRegistCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            /> 
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="memberAddress"  
                                            placeholder='주소'
                                            className={ StudentManagerRegistCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            /> 
                                    </label>
                                </td>
                            </tr>
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
                <button 
                    onClick={ onClickStudentRegistHandler }
                >
                    저장하기
                </button>
            </div>        
        </div>
    </>
    );

}

export default StudentManagerRegist;