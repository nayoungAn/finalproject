import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callteacherClasssDetailAPI } from "../../api/TeacherClassAPICall";
//import TeacherClassDetailCSS from './TeacherclassDetail.module.css';
import TeacherClassNav from "../../components/common/TeacherClassNav"

function TeacherclassDetail(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classesDetail = useSelector(state => state.techerClassReducer);
    
    const params = useParams();

    useEffect(
        () => {
            console.log('[TeacherclassDetail] classCode : ', params.classCode);
            dispatch(callteacherClasssDetailAPI({
                classCode : params.classCode
            }));
        }

        
    );

        return (
            <>
                <div> 
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>강의명</th>
                                <th>시작일</th>
                                <th>종료일</th>
                                <th>강의진행상태</th>
                                <th>담당강사</th>
                            </tr>
                        </thead>

                    <tbody>
                    {
                        Array.isArray(classesDetail) && classesDetail.map(
                            (c) => (
                            <tr
                            key={ c.classCode }
                    >
                            <td>{c.classCode}</td>
                            <td>{c.className}</td>
                            <td>{c.classStartDate}</td>
                            <td>{c.classEndDate}</td>
                            <td>{c.classStatus}</td>
                            <td>{c.member.memberCode}</td>

                        </tr>
                    ))
                    }
                    </tbody>
                   
                   
                   
                    </table>
                </div>
            </>
        );




}

export default TeacherclassDetail;