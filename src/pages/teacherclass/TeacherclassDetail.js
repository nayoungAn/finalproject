import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callteacherClasssDetailAPI } from "../../api/TeacherClassAPICall";
import TeacherClassDetailCSS from './TeacherclassDetail.module.css';
//import TeacherClassNav from "../../components/common/TeacherClassNav"

function TeacherclassDetail(){
    
  //  const navigate = useNavigate();
    const dispatch = useDispatch();
    const classesDetail = useSelector(state => state.teacherClassReducer);
    console.log("classesDetail", classesDetail);
    const params = useParams();

    useEffect(
        () => {
            console.log('[TeacherclassDetail] classCode : ', params.classCode);
            dispatch(callteacherClasssDetailAPI({
                classCode : params.classCode
            }));
        },[]

        
    );

        return (
            <>
           
                <form className={TeacherClassDetailCSS.background}>
                    <div className={TeacherClassDetailCSS.balance}>
                    <tr>
                <th>강의명</th>
                {classesDetail.member &&(
                    <td className={TeacherClassDetailCSS.classtitle}>
                        {classesDetail.className}</td>
                )}
                
                <th>담당강사</th>
                {classesDetail.member &&(
                    <td className={TeacherClassDetailCSS.classteacher}>
                        {classesDetail.member.memberName}</td>
                )}
                </tr>

                <tr>

                <th>수업기간</th>
                <div className={TeacherClassDetailCSS.period}>
                <td>{classesDetail.classStartDate}</td>
                <td>~</td>
                <td>{classesDetail.classEndDate}</td>
                </div>
                
                
              

                </tr>

                <tr>
                    <th>수강 모집인원</th>
                    <td className={TeacherClassDetailCSS.quota}>{classesDetail.classQuota}</td>
                    
                    <th>강의실</th>
                    <td className={TeacherClassDetailCSS.classRoom}>{classesDetail.classRoom}</td>
                </tr>

                <div className={TeacherClassDetailCSS.classnote}>
                <th>강의설명</th>
                 {classesDetail.subject &&(
                    <td className={TeacherClassDetailCSS.note}>{classesDetail.subject.subjectDescription}</td>
                )}
                </div>

                <div>
                    <tr>
                    <th>자료목록</th>
                    </tr>

                    <div className={TeacherClassDetailCSS.List}>
                    <tr>
                        <td>No.</td>
                        <td>파일명</td>
                        <td>첨부일자</td>
                    </tr>
                    </div>
                    
                </div>

                    </div>

              

                </form>

               

            </>
        );




}

export default TeacherclassDetail;