import { NavLink } from "react-router-dom";

function FindMemInfoNav(){
   
  
    return(
        
        <>
            <ul>
                <li><NavLink to="/findmeminfo/find-id">아이디 찾기</NavLink></li>
                <li><NavLink to="/findmeminfo/find-pwd">비밀번호 찾기</NavLink></li>
            </ul>
        </>
    );
}

export default FindMemInfoNav;