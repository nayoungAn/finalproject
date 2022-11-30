import { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callAttendCheckAPI } from "../../api/AttendAPICalls";
import AttendCSS from "./Attend.module.css";
function AttendUpdate() {

    const dispatch = useDispatch();
    const attend = useSelector(state => state.attendReducer);
    const params = useParams();
    const attendCheck = useSelector(state => state.attendCheckReducer);
    const [checkValue, setCheckValue ] = useState(false);

    
    const onChangeCheckHandler = () => {
     
    }

    

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
                        <col width="30%" />
                        <col width="50%" />
                        <col width="50%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>원생</th>
                            <th>출결 관리</th>
                            <th>출석 상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        { Array.isArray(attend) && attend.map((a) =>(
                            <tr
                                key={ a.classHistoryCode }
                            >   
                                <td>{ a.member.memberName  }</td>
                                <td> <input type="checkbox" id="btn1" name="checkWrap" value="출석" />
                                     <label htmlFor="btn1">출석</label>
                                     <input type="checkbox" id="btn2" name="checkWrap" value="지각" />
                                     <label htmlFor="btn2">지각</label>
                                     <input type="checkbox" id="btn3" name="checkWrap" value="결석" />
                                     <label htmlFor="btn3">결석</label></td>
                            </tr>
                        ))}
                            
                            
                           
                        { Array.isArray(attendCheck) && attendCheck.map((c) =>(
                            <tr
                                key={ c.attendCode }
                            >   
                                <td> </td>
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