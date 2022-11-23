import { useDispatch} from "react-redux";
import { callFindIdAPI } from "../../api/MemberAPICalls";
import { useState } from 'react';

function FindId() {
   
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        memberName: '',
        memberEmail: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }    

    const onClickFindHandler = () => {
        dispatch(callFindIdAPI({
            form : form
        }));
        console.log("form", form);  
    }

    return(

        <>
            <p> ID를 잊으셨나요? 아래의 정보를 입력해주세요.</p>
            <input
                 type="text"
                 placeholder="이름을 입력하세요"
                 name="memberName"
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
                아이디 찾기 
            </button>    
              
        </>
    );
}

export default FindId;