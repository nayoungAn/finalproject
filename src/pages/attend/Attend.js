import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callAttendAPI } from "../../api/AttendAPICalls";
import AttendCSS from "./Attend.module.css";
function Attend() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const attend = useSelector(state => state.attendReducer);
    const attendList = attend.data;
    const params = useParams();

    console.log('출석부조회attend', attend);
    console.log('출석부조회', attendList);

    const pageInfo = attend.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = pageInfo.startPage ; i <= pageInfo.endPage ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callAttendAPI({
                classCode : params.classCode,
                currentPage: currentPage
            }))
        }
        ,[currentPage]
    );

    // if(attendList.attendDate) console.log("날짜", attendList.attendDate );

    return(

        <>  {attendList && (
            <div className={ AttendCSS.bodyDiv }>
                <h3> {attendList.attendCode }</h3>
               
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
                        { Array.isArray(attendList) && attendList.map((a) =>(
                            <tr
                                key={ a.attendCode }
                            >   
                                <td>{ a.historyCode.member.memberName  }</td>
                                <td>{ a.attendStatus }</td>
                            </tr>
                        ))}
                    </tbody>
               </table>
               
            </div>
            )}
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(attendList) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className={ AttendCSS.pagingBtn }
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'skyblue' } : null}
                    className={ AttendCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(attendList) &&
            <button 
                className={ AttendCSS.pagingBtn }
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
            >
                &gt;
            </button>
            }
        </div>
        </>
    );    
}

export default Attend;