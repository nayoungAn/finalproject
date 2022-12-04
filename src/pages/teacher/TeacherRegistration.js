import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callTeacherRegistAPI } from "../../api/TeacherAPICall";
import TeacherCSS from "./TeacherRegistration.module.css";

function TeacherRegistration(){

  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [ image, setImage ] = useState(null);
    const [ imageUrl, setImageUrl] = useState('');
    const member = useSelector(state => state.teacherListReducer);
    const memberInfo = member.data;
    console.log("memberInfo", memberInfo)
    console.log("member", member)
    
    const [ form, setForm ] = useState({
    
        memberName: '',
        memberBirthday: '',
        memberId :'',
        memberPassword: '',
        memberGender: '',
        memberEmail: '',
        memberPhone: '',
        memberAddress: ''
    });

    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    const onChangeImageUpload = (e) =>{
        const image = e.target.files[0];

        setImage(image);
    }


    useEffect(() => {
        if(image){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if(result){
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    },
    [image]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

 


    const onClickTeacherRegistrationHandler = () => {

        const formData = new FormData();

        formData.append("memberId", form.memberId);
        formData.append("memberPassword", form.memberPassword);
        formData.append("memberName", form.memberName);
        formData.append("memberPhone", form.memberPhone);
        formData.append("memberBirthday", form.memberBirthday);
        formData.append("memberGender", form.memberGender);
        formData.append("memberAddress", form.memberAddress);
        formData.append("memberEmail", form.memberEmail);
        
        if(image){
            formData.append("memberImage", image);
        }

        dispatch(callTeacherRegistAPI({
            form : formData
        }));


        alert('강사 등록 완료');
        navigate('/ono/teacher', { replace : true });
        window.location.reload();
    }

    return(
        
        <div className={TeacherCSS.tea}>
            <p> 강사 등록 </p>
                <input
                    style={ { display: 'none' }}
                    type="file"
                    name='memberImage'
                    accept='image/jpg,image/png,image/jpeg,image/gif'
                    onChange={ onChangeImageUpload }   
                    ref={ imageInput }
                    />

                <div
                    
                    className={TeacherCSS.uploadBtn1}
                    onClick={ onClickImageUpload }
                    >  
                    { imageUrl && <img
                        className={TeacherCSS.uploadBtn2}
                        src={ imageUrl }
                        alt="preview"
                    />}
                 </div>
            <div className={TeacherCSS.member}>
                <table>
                    <tbody>
                        <tr>
                            <td><label> 이름 </label></td>
                            <td>
                                <input
                                    name='memberName'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                            <td><label> 성별 </label></td>
                            <td>
                                <label><input type="radio" name="memberGender"  onChange={ onChangeHandler } value="여성"/> 여성</label> &nbsp;
                                <label><input type="radio" name="memberGender"  onChange={ onChangeHandler } value="남성"/> 남성</label>

                            </td>
                            
                        </tr>
                        
                        <tr >
                            <td><label> 생년월일 </label></td>
                            <td>
                                <input
                                    type="date"
                                    name='memberBirthday'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                            <td><label> 이메일 </label></td>
                            <td>
                                <input
                                    type="email"
                                    name='memberEmail'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label> 아이디 </label></td>
                            <td>
                                <input
                                    name='memberId'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                            <td><label> 휴대번호 </label></td>
                            <td>
                                <input
                                    name='memberPhone'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label> 비밀번호 </label></td>
                            <td>
                                <input
                                    type='password'
                                    name='memberPassword'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                            <td><label> 주소 </label></td>
                            <td>
                                <input
                                    name='memberAddress'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                      
                    </tbody>
                </table>
            </div>
              
            <button
                className={TeacherCSS.teaBtn}
                onClick= {onClickTeacherRegistrationHandler}
                > 등록 
            </button>   
                
        </div>
       
    )
}

export default TeacherRegistration;