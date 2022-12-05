import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callAttendAPI, callAttendUpdateAPI } from "../../api/AttendAPICalls";
import AttendCSS from "./Attend.module.css";
function Attend() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const attend = useSelector(state => state.attendReducer);
    const params = useParams();
    const attendCheck = useSelector(state => state.attendCheckReducer);
    const [ form, setForm ] = useState({});
 
    console.log('attend', attend);
    console.log('attendCheck', attendCheck);

    const[modifyMode, setModifyMode] = useState(false);
 
    useEffect(
        () => {
            dispatch(callAttendAPI({
                classCode : params.classCode
            }));
            },[]
        );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }    

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            attendCode : attendCheck.attendCode,
            attendStatus : attendCheck.attendStatus
        })
    }
    console.log("출석상태" , attendCheck.attendStatus )

    const onClickAttendUpdateHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
        dispatch(callAttendUpdateAPI({
            form : form
        }));
        alert('출석부 수정');  
       
    } 

    
    const onClickHadler = () => {
        navigate(`/ono/tea/attendUpdate/${params.classCode}`, {replace : false})
    }

    return(

        <> 
            <div className={ AttendCSS.bodyDiv }>
                <button
                   onClick={onClickHadler}>출석관리</button>
                {!modifyMode &&
                    <button
                        onClick={onClickModifyModeHandler}
                    >
                        수정모드
                    </button>
                }
                {modifyMode &&
                    <button
                        onClick={ onClickAttendUpdateHandler}
                    >
                        수정 저장
                    </button>    
                }
               <table className={ AttendCSS.attendTable }>
                    <colgroup>
                        <col width="10%" />
                        <col width="80%" />
                        <col width="80%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>원생</th>
                            <th>출석 상태</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        { Array.isArray(attend) && attend.map((a) =>(
                            <tr
                                key={ a.classHistoryCode }
                            >   
                                <td> 
                                    <input
                                        type="text"
                                        readOnly={true}
                                        value={ a && a.member.memberCode || ''}/></td>
                                <td> 
                                    <input
                                        type="text"
                                        readOnly={true}
                                        value={ a && a.member.memberName  || ''}/></td>  
                            </tr>
                        ))}
                        {modifyMode &&
                            <td> 
                             <label>
                                <input 
                                    type="radio"
                                     name="attendStatus"  
                                     onChange={ onChangeHandler } 
                                     value="출석"
                                     readOnly={modifyMode ? false : true }
                                     checked={(!modifyMode ? attendCheck?.attendStaus : form.attendStatus) === '출석' ? true : false}
                                     /> 출석</label> &nbsp;
                            
                             <label>
                                <input 
                                    type="radio"
                                     name="attendStatus"  
                                     onChange={ onChangeHandler } 
                                     value="지각"
                                     readOnly={modifyMode ? false : true }
                                     checked={(!modifyMode ? attendCheck?.attendStaus : form.attendStatus) === '지각' ? true : false}
                                     /> 지각 </label> &nbsp;
                            
                             <label>
                                <input 
                                    type="radio"
                                     name="attendStatus"  
                                     onChange={ onChangeHandler } 
                                     value="결석"
                                     readOnly={modifyMode ? false : true }
                                     checked={(!modifyMode ? attendCheck?.attendStaus : form.attendStatus) === '결석' ? true : false}
                                     /> 결석</label> &nbsp;
                            
                             </td>
                             }
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
