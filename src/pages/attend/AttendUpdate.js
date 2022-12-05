import { useEffect ,useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callAttendCheckAPI } from "../../api/AttendAPICalls";
import AttendCSS from "./Attend.module.css";
function AttendUpdate() {

    const dispatch = useDispatch();
    const attend = useSelector(state => state.attendReducer);
    const params = useParams();
    const attendCheck = useSelector(state => state.attendCheckReducer);

    const [checkedList, setCheckedList ] = useState([]);
    
    const checkList = [
        { id: 0, data: '출석' },
        { id: 1, data: '지각' },
        { id: 2, data: '결석' },
    ]

 
    const onCheckedElement = (checked, item) =>{
        if(checked) {
            setCheckedList([...checkedList, item]);
          
        } else if(!checked){
            setCheckedList(checkedList.filter(el => el !== item));
        }
    };


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
                           <td> 
                                    {checkList.map(item => {
                                        return(
                                            <label key={item.id}>
                                                <input
                                                name="check"
                                                type="checkbox"
                                                value={item.data}
                                                onChange={e => {
                                                    onCheckedElement(e.target.checked, e.target.value);
                                                }}
                                                checked={checkedList.includes(item.data) ? true : false}/>
                                                { item.data }
                                            </label>
                                                )
                                        }) 
                                        
                                    }
                                </td>
                         
                        
                            
                            {checkedList.map(item => {
                                return(
                                    <td key={item} 
                                     >
                                        { item } 
                                    </td>
                                    
                                )
                            })}
                            </tr>
                             ))}
                            
                       {/*{ Array.isArray(attendCheck) && attendCheck.map((c) =>(
                           <tr>
                           <td> 
                                    {checkList.map(item => {
                                        return(
                                            <label key={item.id}>
                                                <input
                                                name="check"
                                                type="checkbox"
                                                value={item.data}
                                                onChange={e => {
                                                    onCheckedElement(e.target.checked, e.target.value);
                                                }}
                                                checked={checkedList.includes(item.data) ? true : false}/>
                                                { item.data }
                                            </label>
                                                )
                                        }) 
                                        
                                    }
                                </td>
                         
                        
                            {checkedList.length === 0 && (
                                <td> 미입력 </td>
                            )}
                            {checkedList.map(item => {
                                return(
                                    <td key={item} 
                                     valu={checkedList.includes(item.data) ? true : false} >
                                        { item } 
                                    </td>
                                )
                            })}
                            </tr>
                        ))}*/}
                    </tbody>
               </table>
            </div>  
        </>
    );    
}

export default AttendUpdate;