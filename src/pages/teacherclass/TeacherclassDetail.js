import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callteacherClasssDetailAPI } from "../../api/TeacherClassAPICall";

import TeacherClassDetailCSS from "./TeacherclassDetail.module.css";


function TeacherclassDetail() {


    const dispatch = useDispatch();
    const classesDetail = useSelector(state => state.teacherClassReducer);
    const classDetail = classesDetail.openClasses;
    const attachList = classesDetail.attachList;
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
                {classDetail &&(
                    <td className={TeacherClassDetailCSS.classtitle}>
                        {classDetail.className}</td>
                )}
                
                <th>담당강사</th>
                {classesDetail.member ? (
                    <td className={TeacherClassDetailCSS.classteacher}>
                        {classDetail.member.memberName}</td>
                ) : <td className={TeacherClassDetailCSS.classteacher}>
                test</td>}
                </tr>

                <tr>

                <th>수업기간</th>
                {classDetail &&(
                    <div className={TeacherClassDetailCSS.period}>
                    <td>{classDetail.classStartDate}</td>
                    <td>~</td>
                    <td>{classDetail.classEndDate}</td>
                    </div>
                )}
  
                </tr>

                <tr>
                    <th>수강 모집인원</th>
                    {classDetail &&(
                        <td className={TeacherClassDetailCSS.quota}>{classDetail.classQuota}</td>
                    )}
                    
                    
                    <th>강의실</th>
                    {classDetail &&(
                        <td className={TeacherClassDetailCSS.classRoom}>{classDetail.classRoom}</td>
                    )}
                    
                </tr>

                <div className={TeacherClassDetailCSS.classnote}>
                <th>강의설명</th>
                 {classDetail &&(
                    <td className={TeacherClassDetailCSS.note}>{classDetail.subject.subjectDescription}</td>
                )}
                </div>

                <div >
                    <tr>
                    <th>자료목록</th>
                    </tr>


                    <div className={TeacherClassDetailCSS.List}>
                        <table className={TeacherClassDetailCSS.attachtable}>
                            <tr>
                                <td>No.</td>
                                <td>파일명</td>
                                <td>첨부일자</td>
                            </tr>

                   
                    {
                        Array.isArray(attachList) && attachList.map(
                           (attach) => (
                            <tr
                            key={ attach.openClasses.classCode }
                            >
                                <td>{attach.attachCode}</td>
                                <td>{attach.attachNote}</td>
                                <td>{attach.attachDate}</td>
                            </tr>
                           ) )                        
                    }

                        </table>

                    

                    </div>


                    </div>

                    </div>

              

                </form>

               
                     
            </>
        );



}

export default TeacherclassDetail;
