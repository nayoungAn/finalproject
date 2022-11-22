import { NavLink } from "react-router-dom";

function FindMemInfoNav(){
   
  
    return(
        
        <>
            <ul>
                <li><NavLink to="/find-id">아이디 찾기</NavLink></li>
                <li><NavLink to="/find-pwd">비밀번호 찾기</NavLink></li>
            </ul>
        </>
    );
}

export default FindMemInfoNav;