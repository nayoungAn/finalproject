
import { NavLink } from "react-router-dom";
import HeaderCSS from "./Header.module.css";

function Header(){


    const isLogin = null;

    function BeforeLogin(){
        return (
            <div className={HeaderCSS.logintext}>
                <NavLink to="/login">로그인</NavLink> | <NavLink to="/register">회원가입</NavLink>
            </div>
        );
    }

    function AfterLogin() {
        return(
            
        <div>
            <button className={HeaderCSS.HeaderBtn}>마이페이지</button> | <button className={HeaderCSS.HeaderBtn}>로그아웃</button>
        </div> 
    
           
        )
    }


    return (
        <>
            <div className={ HeaderCSS.HeaderDiv }>
                <NavLink to="/"> <img src={process.env.PUBLIC_URL +'/logo/mainlogo.png' } className={HeaderCSS.mainlogo} alt="메인로고"/></NavLink>

                { !isLogin ? <BeforeLogin/> : <AfterLogin/>}
            </div>
        </>
    );


   


}

export default Header;