import AccManagementCSS from "./AccManagement.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callSearchListForAdminAPI } from "../../api/AccListAPICall";
import HeaderCSS from "../../components/common/Header";

function AccManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const acc = useSelector((state) => state.accListReducer);
  const accList = acc.data;
  console.log("accManagement", accList);

  const pageInfo = acc.pageInfo;
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* 페이지 클릭 시 이동 */
  const pageNumber = [];
  if (pageInfo) {
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }

  /* */
  useEffect(
    () => {
        dispatch(callSearchListForAdminAPI({
            searchValue : searchValue,
            currentPage : currentPage
        }));
    }
    , [currentPage, searchValue]
);

  /* 테이블 클릭 시 상세 조회 */
  const onClickTableTr = (s, accCode) => {
    console.log(s.target.accCode);
    navigate(`/ono/acc-update/${accCode}`, { replace: false });
    console.log("상세조회");
  };

  /* 검색 키워드 입력 시 입력 값 상태 저장 */
  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
    console.log(searchValue)
  };

  return (
    <>
     <div className={AccManagementCSS.acctitle}>
        <div className={AccManagementCSS.accDetail}>
        <h2>수납목록</h2>
        </div>
          
      </div>
      
      <div className={AccManagementCSS.bodyDiv}>

    

      <div className={AccManagementCSS.search}>
        
            <input
                    className={ AccManagementCSS.InputStyle }
                    type="text"
                    placeholder="조회할 상태를 입력하세요."
                    value={ searchValue }
                    onChange={ onSearchChangeHandler }
            />
             <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"></img>
            </div>
      </div>
      
      <table className={AccManagementCSS.accTable}>
        <colgroup>
          <col width="9%" /> 
          <col width="7%" />
          <col width="15%" />
          <col width="20%" />
          <col width="15%" />
          <col width="13%" />
          <col width="11%" />
        </colgroup>
        <thead>
          <tr>
            <th>목록</th>
            <th>이름</th>
            <th>번호</th>
            <th>과목</th>
            <th>금액</th>
            <th>일자</th>
            <th>방법</th>
            <th>상태</th>
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
                <td>{s.classesHistory.member.memberName}</td>
                <td>{s.classesHistory.member.memberPhone}</td>
                <td>{s.classesHistory.openClasses.className}</td>
                <td>{s.classesHistory.openClasses.classPrice}</td>
                <td>{s.accDate}</td>
                <td>{s.accOption}</td>
                <td>{s.accStatus}</td>
              </tr>
            ))}
        </tbody>
      </table>

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
              style={currentPage === num ? { backgroundColor: "transparent" } : null}
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