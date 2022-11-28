import SmsManagementCSS from "./SmsManagement.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callSmsListForAdminAPI } from "../../api/SmsListAPICall";

function SmsManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sms = useSelector((state) => state.smsListReducer);
  const smsList = sms.data;
  console.log("smsManagement", smsList);

  const pageInfo = sms.pageInfo;

  const [currentPage, setCurrentPage] = useState(1);

  const pageNumber = [];
  if (pageInfo) {
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }
  //window.location.reload()
  useEffect(() => {
    dispatch(
      callSmsListForAdminAPI({
        currentPage: currentPage,
      })
    );
  }, [currentPage]);

  //   const onClickSmsInsert = () => {
  //     console.log("[SmsManagement] onClickSmsInsert");
  //     navigate("/ono/sms/sms-update", { replace: false });
  //   };

  const onClickTableTr = (s, smsCode) => {
    console.log(s.target.smsCode);
    navigate(`/ono/sms-transmission/${smsCode}`, { replace: false });
    console.log("상세조회");
  };
  if(smsList){
  console.log("zz", sms.data.data)
   }
    return (
    <>
      <div className={SmsManagementCSS.bodyDiv}>
        <table className={SmsManagementCSS.productTable}>
          <colgroup>
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            
          </colgroup>
          <thead>
            <tr>
              <th>문자번호</th>
              <th>이름</th>
              <th>번호</th>
              <th>과목</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(smsList) &&
              smsList.map((s) => (
                <tr
                  key={s.smsCode}
                  onClick={(event) => onClickTableTr(event, s.smsCode)}
                >
                  <td>{s.smsCode}</td>
                  <td>{s.classesHistory.openClasses.member.memberName}</td>
                  <td>{s.classesHistory.openClasses.member.memberPhone}</td>
                  <td>{s.classesHistory.openClasses.className}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {Array.isArray(smsList) && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={SmsManagementCSS.pagingBtn}
          >
            &lt;
          </button>
        )}
        {pageNumber.map((num) => (
          <li key={num} onClick={() => setCurrentPage(num)}>
            <button
              style={currentPage === num ? { backgroundColor: "orange" } : null}
              className={SmsManagementCSS.pagingBtn}
            >
              {num}
            </button>
          </li>
        ))}
        {Array.isArray(smsList) && (
          <button
            className={SmsManagementCSS.pagingBtn}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage === pageInfo.maxPage || pageInfo.endPage === 1
            }
          >
            &gt;
          </button>
        )}
      </div>
    </>
  );
}

export default SmsManagement;
