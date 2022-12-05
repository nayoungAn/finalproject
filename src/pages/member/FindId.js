import { useDispatch} from "react-redux";
import { callFindIdAPI } from "../../api/MemberAPICalls";
import { useState } from 'react';
import FindCSS from './Find.module.css';

function FindId() {
   
    const [isInputClicked, setIsInputClicked] = useState(false);
    const [InputClicked, setInputClicked] = useState(false);
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
        <div className={FindCSS.findDiv}>
            
            <div className={FindCSS.findText}>
                <p> <a>아이디</a>를 잊으셨나요? <br/> 아래의 정보를 입력해주세요.</p>
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
                        placeholder={ isInputClicked === true ? "" : "이름을 입력하세요"}
                        name="memberName"
                        autoComplete = 'off'
                        onChange={ onChangeHandler }/>
                    <br/>
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
                </div>  
            <button
                className={FindCSS.findBtn}
                onClick={ onClickFindHandler }
            > 
                아이디 찾기 
            </button>    
        </div>   
          
        </>
    );
}

export default FindId;