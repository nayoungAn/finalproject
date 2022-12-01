// import MainCSS from './Main.module.css';
import ClassHistoryCSS from "./ClassHistory.module.css";
import ClassHistoryItem from "../../components/classHistory/ClassHistoryItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callSearchListAPI } from "../../api/StudentManagerAPICalls";
import ClassDetail from "../../pages/classes/ClassDetail";
import ClassHistoryList from "./ClassHistoryList";
import ClassHistoryRegistModal from "../../components/common/classHistory/ClassHistoryRegistModal";

function ClassHistory() {
    
  
  const dispatch = useDispatch();
  const classHistories = useSelector((state) => state.studentManagerReducer);
  const classHistory = classHistories.data;
  
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [classHistoryRegistModal, setClassHistoryRegistModal] = useState(false);

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
          <h3>수강 관리</h3>
          <input
            className={ClassHistoryCSS.InputStyle}
            type="text"
            placeholder="검색"
            value={searchValue}
            onChange={onSearchChangeHandler}
          />

          
          <div>
          <h4>이름 Id</h4>
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
          { classHistoryRegistModal ? <ClassHistoryRegistModal setClassHistoryRegistModal={ setClassHistoryRegistModal }/> : null }     
          <div className={ClassHistoryCSS.item3}>
            <h4>수강 목록</h4>
            <button onClick={ () =>   setClassHistoryRegistModal(true)}>수강 등록</button>
            <ClassHistoryList />
            
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassHistory;
