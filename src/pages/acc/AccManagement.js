import AccManagementCSS from "./AccManagement.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callAccListForAdminAPI } from "../../api/AccListAPICall";

function AccManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const acc = useSelector((state) => state.accListReducer);
  const accList = acc.data;
  console.log("accManagement", accList);

  const pageInfo = acc.pageInfo;

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
      callAccListForAdminAPI({
        currentPage: currentPage,
      })
    );
  }, [currentPage]);

  //   const onClickAccInsert = () => {
  //     console.log("[AccManagement] onClickAccInsert");
  //     navigate("/ono/acc/acc-registration", { replace: false });
  //   };

  const onClickTableTr = (s, accCode) => {
    console.log(s.target.accCode);
    navigate(`/ono/acc-update/${accCode}`, { replace: false });
    console.log("상세조회");
  };

  return (
    <>
      <div className={AccManagementCSS.bodyDiv}>
        <table className={AccManagementCSS.productTable}>
          <colgroup>
            <col width="10%" />
            <col width="30%" />
            <col width="40%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th>수납번호</th>
              <th>수납일</th>
              <th>결제방법</th>
              <th>수납메모</th>
              <th>이름</th>
              <th>번호</th>
              <th>과목</th>
              <th>수강료</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(accList) &&
              accList.map((s) => (
                <tr
                  key={s.accCode}
                  onClick={(event) => onClickTableTr(event, s.accCode)}
                >
                  <td>{s.accCode}</td>
                  <td>{s.accDate}</td>
                  <td>{s.accOption}</td>
                  <td>{s.accContent}</td>
                  <td>{s.classesHistory.openClasses.member.memberName}</td>
                  <td>{s.classesHistory.openClasses.member.memberPhone}</td>
                  <td>{s.classesHistory.openClasses.className}</td>
                  <td>{s.classesHistory.openClasses.classPrice}</td>
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
        {Array.isArray(accList) && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={AccManagementCSS.pagingBtn}
          >
            &lt;
          </button>
        )}
        {pageNumber.map((num) => (
          <li key={num} onClick={() => setCurrentPage(num)}>
            <button
              style={currentPage === num ? { backgroundColor: "orange" } : null}
              className={AccManagementCSS.pagingBtn}
            >
              {num}
            </button>
          </li>
        ))}
        {Array.isArray(accList) && (
          <button
            className={AccManagementCSS.pagingBtn}
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

export default AccManagement;
