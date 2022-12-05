import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callStudentManagerRegistAPI, callMemberIdCheckAPI, callMemberEmailCheckAPI } from '../../api/StudentManagerAPICalls';
import StudentManagerRegistCSS from './StudentManagerRegist.module.css';

function StudentManagerRegist() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const checkid = useSelector(state => state.studentManagerReducer);
    const checkemail = useSelector(state => state.studentManagerDetailReducer);

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

    // 핸드폰번호 유효성 검사
    const checkPhonenumber = (e) => {
        // '-' 입력 시
        var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
        // 형식에 맞는 경우 true 리턴
        console.log('핸드폰번호 유효성 검사 :: ', regExp.test(e.target.value))
        if(regExp.test(e.target.value) == false) {
            alert("전화번호 형식에 맞지않습니다.");
        }
    }

    const checkBirthday = (e) => {
        // '-' 입력 시
        var regExp = /^(19[0-9][0-9]|20\d{2})\/(0[0-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/
        // 형식에 맞는 경우 true 리턴
        console.log('생년월일 유효성 검사 :: ', regExp.test(e.target.value))
        if(regExp.test(e.target.value) == false) {
            alert("생년월일 형식에 맞지않습니다.");
        }
    }

    
    
    // 이메일 유효성 검사
    const checkEmail = (e) => {
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        // 형식에 맞는 경우 true 리턴
        console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value))
        if(regExp.test(e.target.value) == false) {
            alert("이메일 형식에 맞지않습니다.");
        }
    }

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

    const onClickCheckMemberId = () => {
        if(form.memberId != '') {
            dispatch(callMemberIdCheckAPI({
                memberId : form.memberId
            }));
        } else {
            alert("아이디를 입력해주세요");
        }
    }

    const onClickCheckMemberEmail = () => {
        if(form.memberEmail != '') {
            dispatch(callMemberEmailCheckAPI({
                memberEmail : form.memberEmail
            }));
        } else {
            alert("이메일을 입력해주세요");
        }
    }
    
    

    /* 원생 등록 버튼 클릭 이벤트 */
    const onClickStudentRegistHandler = () => {

        
        if(form.memberId === '' || form.memberName === '' || form.memberPassword === '' 
            || form.memberPhone === '' || form.memberBirthday === '' || form.memberGender === ''
            || form.memberAddress === '' || form.memberStatus === '' || form.memberEmail === '' 
            || checkid === true || checkid.length === 0 || checkemail === true || checkemail.length === 0
         ) {
            if(checkid == true) {
                alert("중복된 아이디입니다. 다시 입력해주세요");
            } else if(checkemail == true) {
                alert("중복된 이메일입니다. 다시 입력해주세요")
            } else if(checkid.length == 0 || checkemail.length == 0) {
                alert("중복확인을 진행해주세요");
            }
            else {
                alert("정보를 모두 입력해주세요");
            }

        } else {
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
    }


    return (
        <>
            <div>
            <div className={ StudentManagerRegistCSS.studentSection }>
                <div className={ StudentManagerRegistCSS.studentInfoDiv }>
                    
                    <table className={ StudentManagerRegistCSS.studentTable }>
                        <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <div className={ StudentManagerRegistCSS.studentImageDiv }>
                                        <input                
                                            style={ { display: 'none' }}
                                            type="file"
                                            name='memberImage' 
                                            accept='image/jpg,image/png,image/jpeg,image/gif'
                                            onChange={ onChangeImageUpload }
                                            ref={ imageInput }
                                        />
                                        <button 
                                            className={ StudentManagerRegistCSS.studentImageButton }
                                            onClick={ onClickImageUpload } 
                                        >
                                        <img 
                                            className={ StudentManagerRegistCSS.studentImage } 
                                            src={ (imageUrl == null) ? 
                                                (imageUrl == "http://localhost:8001/memberimgs/null") ?
                                                process.env.PUBLIC_URL +'/logo/nopicture.png' : imageUrl : imageUrl } 
                                            alt="preview"
                                        />
                                        </button>
                                    </div>
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
                                        className={ StudentManagerRegistCSS.studentInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                                <td>
                                    <input 
                                        name='memberBirthday'
                                        placeholder='0000/00/00'
                                        className={ StudentManagerRegistCSS.studentInfoInput }
                                        onChange={ onChangeHandler }
                                        onBlur={ checkBirthday }
                                    />
                                </td>
                                
                            </tr>    
                            <tr>
                                <td>
                                    <label>아이디</label>
                                    <button
                                        onClick={ onClickCheckMemberId }
                                    >
                                        중복확인</button></td>
                                <td>
                                    <label>비밀번호</label></td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        <input 
                                            name="memberId"  
                                            type="String"
                                            placeholder='아이디'
                                            className={ StudentManagerRegistCSS.studentInfoInput }
                                            onChange={ onChangeHandler } 
                                            /> 
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="memberPassword"  
                                            placeholder='비밀번호'
                                            className={ StudentManagerRegistCSS.studentInfoInput }
                                            onChange={ onChangeHandler } 
                                            /> 
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>성별</label></td>
                                <td><label>이메일</label>
                                <button
                                    onClick={onClickCheckMemberEmail}
                                >중복확인</button></td>
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
                                            className={ StudentManagerRegistCSS.studentInfoInput }
                                            onChange={ onChangeHandler } 
                                            onBlur={ checkEmail }
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
                                            placeholder='000-0000-0000'
                                            className={ StudentManagerRegistCSS.studentInfoInput }
                                            onChange={ onChangeHandler } 
                                            onBlur={ checkPhonenumber }
                                            />
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="memberAddress"  
                                            placeholder='주소'
                                            className={ StudentManagerRegistCSS.studentInfoInput }
                                            onChange={ onChangeHandler } 
                                            /> 
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>상태</label></td>
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
                    등록하기
                </button>
            </div>        
        </div>
    </>
    );

}

export default StudentManagerRegist;