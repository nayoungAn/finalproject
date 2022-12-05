import { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callLoginAPI } from "../../api/MemberAPICalls";
import LoginCSS from './Login.module.css'


function Login() {

    const [isInputClicked, setIsInputClicked] = useState(false);
    const [InputClicked, setInputClicked] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = useSelector(state => state.memberReducer);
    
    useEffect(() => {
        if(login.status === 200) {
            console.log("[Login] Login SUCCESS {}", login);
            navigate("/ono/notice", { replace: true });
        }
    }
    ,[login]
)
  
    const[form, setForm] = useState({
        memberId: '',
        memberPassword: ''
    })

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickHandler = () => {
        dispatch(callLoginAPI({
            form: form
        }))     
    }

    const onClickFindHandler = () => {
       
        navigate("/findmeminfo", { replace: false });
           
    }
    return(
        <div className={ LoginCSS.backgroundDiv }>
        <div className={ LoginCSS.loginDiv }>
    
            <img src="images/onologo.png" alt="logo image"/>
            <input
                type="text"
                name="memberId"
                onFocus={() => {
                    setIsInputClicked(true);
                }}
                onBlur={() => {
                    setIsInputClicked(false);
                }}
                placeholder={ isInputClicked === true ? "" : "아이디를 입력하세요"}
                autoComplete='off'
                onChange={ onChangeHandler }
            />
            <input
                type="password"
                name="memberPassword"
                onFocus={() => {
                    setInputClicked(true);
                }}
                onBlur={() => {
                    setInputClicked(false);
                }}
                placeholder={ InputClicked === true ? "" : "비밀번호를 입력하세요"}
                autoComplete='off'
                onChange={ onChangeHandler }
            />
            <button
                onClick={ onClickHandler } 
            >
                Login
            </button>
            <h6 onClick={ onClickFindHandler } className={ LoginCSS.loginFind }>
                아이디ㆍ비밀번호 찾기 &gt;
            </h6>
            </div>

         
        </div>

      

        );

     
}

export default Login;