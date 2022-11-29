import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callAttendCheckAPI } from "../../api/AttendAPICalls";
import AttendCSS from "./Attend.module.css";
function AttendUpdate() {

    const dispatch = useDispatch();
    const attend = useSelector(state => state.attendReducer);
    const params = useParams();
    const attendCheck = useSelector(state => state.attendCheckReducer);
 
    useEffect(
        () => {
            dispatch(callAttendCheckAPI({
                classCode : params.classCode
                
            }))
        }
        ,[]
    );
    
    console.log('attend수정', attend);
    console.log('attendCheck수정', attendCheck);

    return(

        <> 
            <div className={ AttendCSS.bodyDiv }>
               <table className={ AttendCSS.attendTable }>
                    <colgroup>
                        <col width="80%" />
                        <col width="80%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>원생</th>
                            <th>출석 상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        { Array.isArray(attend) && attend.map((a) =>(
                            <tr
                                key={ a.classHistoryCode }
                            >   
                                <td>{ a.member.memberName  }</td>
                                <td>{ a.attendStatus}</td>
                            </tr>
                        ))}
                 
                        { Array.isArray(attendCheck) && attendCheck.map((c) =>(
                            <tr
                                key={ c.attendCode }
                            >   
                                <td>{ c.attendStatus  }</td>
                            </tr>
                        ))}
                    </tbody>
               </table>
            </div>  
        </>
    );    
}

export default AttendUpdate;