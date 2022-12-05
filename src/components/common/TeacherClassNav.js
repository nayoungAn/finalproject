import { NavLink, useNavigate, useParams } from "react-router-dom";
import TeacherClassCSS from "./TeacherClassNav.module.css";

function FindMemInfoNav(){
     const params = useParams();
     const navigate = useNavigate()

    const onClickQanclassHandlerHandler = () => {
        navigate(`/ono/tea/qna/${params.classCode}`, {replace:false})
    }

    const onClickTeacherclassHandlerHandler =  (classCode)  => {
        navigate(`/ono/tea/teacherclass/${classCode}`, {replace:false})
    }

    const onClickAttendHandler =() => {
        navigate(`/ono/tea/attend/${params.classCode}`, {replace:false})
    }

    return(
        
        <>
            <ul className={TeacherClassCSS.TeaClassNavUl}>
                <li onClick={onClickTeacherclassHandler}><button>강의정보</button></li>
                <li onClick={onClickQanclassHandler}><button>1:1 상담</button></li>
                <li onClick={onClickAttendHandler}><button>출석부</button></li> 
            </ul>
        </>
    );
}

export default FindMemInfoNav;