import { NavLink, useNavigate, useParams } from "react-router-dom";

function FindMemInfoNav({ classCode }){
     const params = useParams();
     const navigate = useNavigate()

    const onClickQanclass = () => {
        navigate(`/ono/tea/qna/${params.classCode}`, {replace:false})
    }

    const onClickTeacherclass =(classCode)=> {
        navigate(`/ono/tea/teacherclass/${classCode}`, {replace:false})
    }

    return(
        
        <>
            <ul>
                <li onClick={onClickTeacherclass}>강의정보</li>
                <li onClick={onClickQanclass}>1:1 상담</li>
                <li><NavLink to="/">출석부</NavLink></li> 

            </ul>
        </>
    );
}

export default FindMemInfoNav;