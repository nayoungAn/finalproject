import { useDispatch} from "react-redux";
import { callFindPwdAPI } from "../../api/MemberAPICalls";
import { useState } from 'react';

function FindPwd(){
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        memberId: '',
        memberEmail: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }    

    const onClickFindHandler = () => {
        dispatch(callFindPwdAPI({
            form : form
        }));
        console.log("form", form);  
    }

    return(

        <>
            <p> 비밀번호 를 잊으셨나요? 아래의 정보를 입력해주세요.</p>
            <input
                 type="text"
                 placeholder="아이디을 입력하세요"
                 name="memberId"
                 autoComplete = 'off'
                 onChange={ onChangeHandler }/>

            <input    
                type="text"
                 placeholder="이메일을 입력하세요"
                 name="memberEmail"
                 autoComplete = 'off'
                 onChange={ onChangeHandler }/>
            <button
                onClick={ onClickFindHandler }
            > 
                임시비밀번호 발송
            </button>    
              
        </>
    );

}


export default FindPwd;
