// import MainCSS from './Main.module.css';
import ClassHistoryCSS from "./ClassHistory.module.css";
import ClassHistoryItem from "../../components/classHistory/ClassHistoryItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callSearchListAPI } from "../../api/StudentManagerAPICalls";
import HeaderCSS from "../../components/common/Header";
import ClassDetail from "../../pages/classes/ClassDetail";
import ClassHistoryList from "./ClassHistoryList";
function ClassHistory() {
    
  const dispatch = useDispatch();
  const classHistories = useSelector((state) => state.studentManagerReducer);
  const classHistory = classHistories.data;
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageInfo = classHistories.pageInfo;

  /* 페이징 버튼 */
  const pageNumber = [];
  if (pageInfo) {
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }
  useEffect(() => {
    dispatch(
      callSearchListAPI({
        search: searchValue,
        currentPage: currentPage,
      })
    );
  }, [currentPage, searchValue]);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className={ClassHistoryCSS.main}>
        <div className={ClassHistoryCSS.item1}>
          <input
            className={HeaderCSS.InputStyle}
            type="text"
            placeholder="검색"
            value={searchValue}
            onChange={onSearchChangeHandler}
          />

          <h4>원생 이름 휴대전화</h4>
          <div>
            {Array.isArray(classHistory) &&
              classHistory.map((member) => (
                <ClassHistoryItem key={member.memberCode} member={member} />
              ))}
          </div>
          <div
            style={{
              listStyleType: "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {Array.isArray(classHistory) && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                // className={ SubjectManagementCSS.pagingBtn }
              >
                &lt;
              </button>
            )}
            {pageNumber.map((num) => (
              <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                  style={
                    currentPage === num ? { backgroundColor: "orange" } : null
                  }
                  // className={ SubjectManagementCSS.pagingBtn }
                >
                  {num}
                </button>
              </li>
            ))}
            {Array.isArray(classHistory) && (
              <button
                // className={ SubjectManagementCSS.pagingBtn }
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === pageInfo.maxPage || pageInfo.endPage === 1
                }
              >
                &gt;
              </button>
            )}
          </div>
        </div>
        <div className={ClassHistoryCSS.submain}>
          <div className={ClassHistoryCSS.item2}>
            <h4>원생 정보</h4>
            <ClassDetail />
          </div>

          <div className={ClassHistoryCSS.item3}>
            <h4>수강 목록</h4>
            <button>수강 등록</button>
            <ClassHistoryList/>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassHistory;
