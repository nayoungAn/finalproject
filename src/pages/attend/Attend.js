import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callAttendAPI } from "../../api/AttendAPICalls";
import AttendCSS from "./Attend.module.css";
function Attend() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const attend = useSelector(state => state.attendReducer);
    const params = useParams();
    const attendCheck = useSelector(state => state.attendCheckReducer);
    
 
    console.log('attend', attend);
    console.log('attendCheck', attendCheck);

 
    useEffect(
        () => {
            dispatch(callAttendAPI({
                classCode : params.classCode
            }))
        }
        ,[]
    );


    const onClickHadler = () => {
        navigate(`/ono/tea/attendUpdate/${params.classCode}`, {replace : false})
    }
    return(

        <> 
            <div className={ AttendCSS.bodyDiv }>
                <button
                   onClick={onClickHadler}>출석관리</button>
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

export default Attend;