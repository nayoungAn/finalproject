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
      
    </>
  );
}

export default AccManagement;