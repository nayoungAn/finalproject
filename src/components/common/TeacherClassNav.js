import { NavLink, useNavigate, useParams } from "react-router-dom";

function FindMemInfoNav(){
     const params = useParams();
     const navigate = useNavigate()

    const onClickQanclassHandler = () => {
        navigate(`/ono/tea/qna/${params.classCode}`, {replace:false})
    }

    const onClickTeacherclassHandler = (classCode) => {
        navigate(`/ono/tea/teacherclass/${classCode}`, {replace:false})
    }

    const onClickAttendHandler =() => {
        navigate(`/ono/tea/attend/${params.classCode}`, {replace:false})
    }

    return(
        
        <>
            <ul>
                <li onClick={onClickTeacherclassHandler}>강의정보</li>
                <li onClick={onClickQanclassHandler}>1:1 상담</li>
                <li onClick={onClickAttendHandler}>출석부</li> 

            </ul>
        </>
    );
}

export default FindMemInfoNav;