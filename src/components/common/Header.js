
import { NavLink } from "react-router-dom";
import HeaderCSS from "./Header.module.css";

function Header(){


    const isLogin = null;

    function AfterLogin(){
        return (
            <div className={HeaderCSS.logintext}>
                <NavLink to="/login">로그아웃</NavLink> | <NavLink to="/register">회원가입</NavLink>
            </div>
        );
    }



    return (
        <>
            <div className={ HeaderCSS.HeaderDiv }>
                <NavLink to="/"> <img src={process.env.PUBLIC_URL +'/logo/mainlogo.png' } className={HeaderCSS.mainlogo} alt="메인로고"/></NavLink>

               { !isLogin ? <null/> : <AfterLogin/>}
            </div>
        </>
    );


   


}

export default Header;