import { NavLink, useNavigate } from "react-router-dom";
import HeaderCSS from "./Header.module.css";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { callLogoutAPI } from "../../api/MemberAPICalls";
import LoginModal from '../LoginModal';
import { decodeJwt } from '../../utils/tokenUtils';
function Header(){

    /* localStorage에 저장된 토큰 정보가 있으면 로그인 한 상태이다. */
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin){
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginModal, setLoginModal] = useState(false);
      /* 로고 클릭 시 메인 페이지로 이동 */
      const onClickLogoHandler = () => {
        navigate("/", { replace : true });
        }

    /* 로그아웃 버튼 이벤트 */
    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        dispatch(callLogoutAPI());
    }

    const onClickSmsPageHandler = () => {

        //토큰이 만료되었다면 다시 로그인 -> 로그인 모달창 띄우기
        const token = decodeJwt(window.localStorage.getItem('accessToken'));

        if(token.exp * 1000 < Date.now()) {
            setLoginModal(true);
            return;
        }

        navigate("/ono/sms", { replace : true });
    }
    function AfterLogin(){

        return (
            <div>
                 {decoded === "ROLE_ADMIN" && 
                    <button 
                    className={ HeaderCSS.logintext }
                    onClick={ onClickSmsPageHandler }
                >SMS
                </button>
                }
                <button 
                    className={ HeaderCSS.logintext } 
                    onClick={ onClickLogoutHandler }
                >
                    로그아웃
                </button>
               
            </div>
        );
    }

    


    return (
        <>
            { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null }
            <div className={ HeaderCSS.HeaderDiv }>
                <NavLink to="/"> 
                <img src={process.env.PUBLIC_URL +'/logo/mainlogo.png' } className={HeaderCSS.mainlogo} alt="메인로고"/>
                </NavLink>
               { !isLogin ? <null/> : <AfterLogin/>}
            </div>
        </>
    );


   


}

export default Header;