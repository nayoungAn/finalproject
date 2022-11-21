import { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callLoginAPI } from "../../api/MemberAPICalls";
import LoginCSS from './Login.module.css'

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = useSelector(state => state.memberReducer);

    useEffect(() => {
        if(login.status === 200) {
            console.log("[Login] Login SUCCESS {}", login);
            navigate("ono", { replace: true });
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

    return(
        <div className={ LoginCSS.backgroundDiv }>
        <div className={ LoginCSS.loginDiv }>
            <img src="images/ono.png" alt="logo image"/>
            <input
                type="text"
                name="memberId"
                placeholder="아이디"
                autoComplete='off'
                onChange={ onChangeHandler }
            />
            <input
                type="password"
                name="memberPassword"
                placeholder="패스워드"
                autoComplete='off'
                onChange={ onChangeHandler }
            />
            <button
                onClick={ onClickHandler } 
            >
                로그인
            </button>
            <button>
                아이디 | 비밀번호 찾기
            </button>
            </div>
        </div>
        );
}

export default Login;