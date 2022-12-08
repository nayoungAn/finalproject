import { NavLink } from "react-router-dom";
import FindMemInfoCSS from "./FindMemInfoNav.module.css";
function FindMemInfoNav(){
   
  
    return(
        
        <>  
            <div className={FindMemInfoCSS.FindNavDiv}>
                 <ul className={FindMemInfoCSS.FindNavUl} >
                    <li><NavLink to="/findmeminfo/find-id">아이디 찾기</NavLink></li>
                    <li><NavLink to="/findmeminfo/find-pwd">비밀번호 발급</NavLink></li>
                </ul>
            </div>
        </>
    );
}

export default FindMemInfoNav;