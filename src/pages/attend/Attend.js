import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callAttendAPI, callAttendCheckAPI, callAttendUpdateAPI } from "../../api/AttendAPICalls";
import AttendCSS from "./Attend.module.css";
function Attend() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const attend = useSelector(state => state.attendReducer);
    const params = useParams();
    const attendCheck = useSelector(state => state.attendCheckReducer);
    const [ form, setForm ] = useState({});
 
    console.log('attend', attend);
    console.log('attendhistory', attend.historyList);
    console.log('attendCheck', attendCheck);

    const[modifyMode, setModifyMode] = useState(false);
 
    useEffect(
        () => {
            dispatch(callAttendAPI({
                classCode : params.classCode
            }));
            dispatch(callAttendCheckAPI({
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
                   
            </div>
            <div className={ AttendCSS.AttendHistoryTable }>
                <div>
                    <table className={ AttendCSS.attendTable }>
                            <colgroup>
                                <col width="10%" />
                                <col width="10%" />
                                <col width="70%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>원생</th>
                                    
                                </tr>
                            </thead>
                            
                            <tbody>
                                { Array.isArray(attend.historyList) && attend.historyList.map((a) =>(
                                    <tr
                                        key={ a.classHistoryCode }
                                    >   
                                        <td> 
                                            <input
                                                type="text"
                                                readOnly={true}
                                                value={ a.member.memberCode || ''}/></td>
                                        <td> 
                                            <input
                                                type="text"
                                                readOnly={true}
                                                value={ a.member.memberName  || ''}/></td> 
                                        <td> 
                                            <label>
                                                <input 
                                                id={ a.classHistoryCode}
                                                type="checkbox"
                                                name="attendStatus"  
                                                onChange={ onChangeHandler } 
                                                value="출석"
                                                readOnly={modifyMode ? false : true }
                                                checked={(form.attendStatus) === '출석' ? true : false}
                                                /> 출석</label> &nbsp;
                                            
                                            <label>
                                                <input 
                                                id={ a.classHistoryCode}
                                                type="checkbox"
                                                name="attendStatus"  
                                                onChange={ onChangeHandler } 
                                                value="지각"
                                                readOnly={modifyMode ? false : true }
                                                checked={(form.attendStatus) === '지각' ? true : false}
                                                /> 지각 </label> &nbsp;
                                            
                                            <label>
                                                <input 
                                                id={ a.classHistoryCode}
                                                type="checkbox"
                                                name="attendStatus"  
                                                onChange={ onChangeHandler } 
                                                value="결석"
                                                readOnly={modifyMode ? false : true }
                                                checked={(form.attendStatus) === '결석' ? true : false}
                                                /> 결석</label> &nbsp;
                                            
                                        </td> 
                                    </tr>
                                ))}
                                    
                            </tbody>
                    </table>
                </div>
                <div>
                    <table className={ AttendCSS.attendTable }>
                        <thead>
                            <th>출석 상태</th>
                        </thead>
                        <tbody>
                            
                            { attendCheck && attendCheck.map((c) =>(
                                <tr
                                    key={ c.attendCode }
                                >   
                                    <td>{ c.attendStatus  }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    

                </div>
            </div>
           
        </>
    );    

                        }                
export default Attend;


