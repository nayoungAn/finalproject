import { useDispatch} from "react-redux";
import { callFindPwdAPI } from "../../api/MemberAPICalls";
import { useState } from 'react';
import FindCSS from './Find.module.css';
function FindPwd(){
    const dispatch = useDispatch();
    const [isInputClicked, setIsInputClicked] = useState(false);
    const [InputClicked, setInputClicked] = useState(false);

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
         <div className={FindCSS.findDiv}>
            
            <div className={FindCSS.findText}>
                <p> <a>비밀번호</a>를 잊으셨나요? <br/> 아래의 정보를 입력해주세요.</p>
            </div>
                
            <div className={FindCSS.findInfo}>
                <input
                    type="text"
                     onFocus={() => {
                            setIsInputClicked(true);
                        }}
                        onBlur={() => {
                            setIsInputClicked(false);
                        }}
                        placeholder={ isInputClicked === true ? "" : "아이디를 입력하세요"}
                    name="memberId"
                    autoComplete = 'off'
                    onChange={ onChangeHandler }/>

                <input    
                    type="text"
                    onFocus={() => {
                        setInputClicked(true);
                    }}
                    onBlur={() => {
                        setInputClicked(false);
                    }}
                    placeholder={ InputClicked === true ? "" : "이메일을 입력하세요"}
                    name="memberEmail"
                    autoComplete = 'off'
                    onChange={ onChangeHandler }/>
                <button
                     className={FindCSS.findBtn}
                     onClick={ onClickFindHandler }
                > 
                    이메일 발송
                </button> 
            </div>       
        </div>    
        </>
    );

}


export default FindPwd;
