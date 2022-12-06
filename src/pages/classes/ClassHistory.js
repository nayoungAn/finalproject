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
          <h2 className={ClassHistoryCSS.h2}>수강 관리</h2>
          <div className={ClassHistoryCSS.search}>
                <input
                    className={ ClassHistoryCSS.InputStyle }
                    type="text"
                    placeholder="검색"
                    value={ searchValue }
                    onChange={ onSearchChangeHandler }
                />
                <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"></img>
            </div>       
          <div>
            <ul className={ ClassHistoryCSS.name }>
            
            <h5>이름</h5>&emsp;
            <h5>Id</h5>
            </ul>

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
                 className={ ClassHistoryCSS.pagingBtn }
              >
                &lt;
              </button>
            )}
            {pageNumber.map((num) => (
              <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                  style={
                    currentPage === num ? 
                    { color : '#2F65EB', textDecoration : 'underline'} : null}
                    className={ ClassHistoryCSS.pagingBtn }

                >
                  {num}
                </button>
              </li>
            ))}
            {Array.isArray(classHistory) && (
              <button
                 className={ ClassHistoryCSS.pagingBtn }
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
            <h2 className={ClassHistoryCSS.studentH2}>원생 정보</h2>
            <ClassDetail />
          </div>
          <button 
            onClick={ () =>   setClassHistoryRegistModal(true)}
            className={ClassHistoryCSS.btnRegist}
            >수강 등록
            </button>
          { classHistoryRegistModal ? <ClassHistoryRegistModal setClassHistoryRegistModal={ setClassHistoryRegistModal }/> : null }     
          <div className={ClassHistoryCSS.item3}>
            <ClassHistoryList />
          
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassHistory;
