import { NavLink, useNavigate } from "react-router-dom";

function FindMemInfoNav({ classCode }){
   
    const navigate = useNavigate()

    const onClickTeacherclass =(classCode)=> {
        navigate(`/ono/tea/teacherclass/${classCode}`, {replace:false})
    }

    return(
        
        <>
            <ul>
                <li onClick={onClickTeacherclass}>강의정보</li>
                <li><NavLink to="/ono/tea/qna/:classCode">1:1 상담</NavLink></li>
                <li><NavLink to="/">출석부</NavLink></li>

            </ul>
        </>
    );
}

export default FindMemInfoNav;