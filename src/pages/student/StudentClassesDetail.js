import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callstudentClassesDetailAPI } from "../../api/StudentAPICalls";
import StudentClassesDetailCSS from './StudentClassesDetail.module.css';


function StudentClassesDetail(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classesDetail = useSelector(state => state.studentClassReducer);

    const params = useParams();

    useEffect(
        () => {
            
            dispatch(callstudentClassesDetailAPI({
                classCode : params.classCode
            }));
        },[]

        
    );
    return (
        <>
       
            <form className={StudentClassesDetailCSS.background}>
                <div className={StudentClassesDetailCSS.balance}>
                <tr>
            <th>강의명</th>
                <td className={StudentClassesDetailCSS.classtitle}>
                    {classesDetail.classCode}</td>
            <th>담당강사</th>
                <td className={StudentClassesDetailCSS.classteacher}>
                    {classesDetail.member?.memberName}</td>
            </tr>
            <tr>
            <th>수업기간</th>
            <div className={StudentClassesDetailCSS.period}>
            <td>{classesDetail.classStartDate?.split("T",1)}</td>
            <td>~</td>
            <td>{classesDetail.classEndDate?.split("T",1)}</td>
            </div>
            </tr>

            <tr>
                <th>수강 모집인원</th>
                <td className={StudentClassesDetailCSS.quota}>{classesDetail.classQuota}</td>
                
                <th>강의실</th>
                <td className={StudentClassesDetailCSS.classRoom}>{classesDetail.classRoom}</td>
            </tr>

            <div className={StudentClassesDetailCSS.classnote}>
            <th>강의설명</th>
             {classesDetail.subject &&(
                <td className={StudentClassesDetailCSS.note}>{classesDetail.subject.subjectDescription}</td>
            )}
            </div>

            <div>
                <tr>
                <th>자료목록</th>
               
                </tr>
                <tr>
                    <td>No.</td>
                    <td>파일명</td>
                    <td>첨부일자</td>
                </tr>
            </div>

                </div>

          

            </form>

           

        </>
    );




}

export default StudentClassesDetail;