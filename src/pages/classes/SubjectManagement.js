import SubjectManagementCSS from "./SubjectManagement.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callSubjectDeleteAPI } from "../../api/SubjectAPICalls";
import { callSubjectListForAdminAPI } from "../../api/SubjectListAPICall";

function SubjectManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjectListReducer);
  const subjectList = subjects.data;
  const deleteSubjects = useSelector((state) => state.subjectReducer);
  const [search, setSearch] = useState("");

  const pageInfo = subjects.pageInfo;

  const [currentPage, setCurrentPage] = useState(1);

  const pageNumber = [];
  if (pageInfo) {
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }

  useEffect(() => {
    dispatch(
      callSubjectListForAdminAPI({
        currentPage: currentPage,
      })
    );
  }, [currentPage, deleteSubjects]);

  const onClickSubjectInsert = () => {
    navigate("/ono/OpenClasses/subject-registration", { replace: false });
  };

  const onClickSubjectDelete = (subjectCode) => {
    dispatch(
      callSubjectDeleteAPI({
        subjectCode: subjectCode,
      })
    );

   
      alert("과목이 삭제되었습니다.")
 
  };
  const onClickTableTr = (e, subjectCode) => {
    e.target.className != "deleteBtn"
      ? navigate(`/ono/OpenClasses/subject-update/${subjectCode}`, {
          replace: false,
        })
      : onClickSubjectDelete(subjectCode);
  };

  /* 검색 키워드 입력 시 입력 값 상태 저장 */
  const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  };
  /* enter 키 입력 시 검색 화면으로 넘어가는 처리 */
  const onEnterKeyHandler = (e) => {
    if (e.key == "Enter") {

      navigate(`/ono/OpenClasses/search?value=${search}`, { replace: false });
    }
  };

  const onClickSearch = () => {
    navigate(`/ono/OpenClasses/search?value=${search}`, { replace: false });
  };

  return (
    <>
      <div className={SubjectManagementCSS.bodyDiv}>
        <div>
          <h2>과목 목록</h2>
          <button
            className={SubjectManagementCSS.btnSearch}
            onClick={() => onClickSearch()}
          >
            검색
          </button>
          <input
            className={SubjectManagementCSS.InputStyle}
            type="text"
            placeholder="검색"
            value={search}
            onKeyUp={onEnterKeyHandler}
            onChange={onSearchChangeHandler}
          />
        </div>
        <table className={SubjectManagementCSS.subjectTable}>
          <colgroup>
            <col width="10%" />
            <col width="10%" />
            <col width="30%" />
            <col width="10%" />
            <col width="10%" />
            <col width="5%" />
          </colgroup>
          <thead>
            <tr className={SubjectManagementCSS.subjectThead}>
              <th>과목번호</th>
              <th>과목명</th>
              <th>과목 설명</th>
              <th>언어</th>
              <th>수업형태</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(subjectList) &&
              subjectList.map((s) => (
                <tr
                  key={s.subjectCode}
                  onClick={(event) => onClickTableTr(event, s.subjectCode)}
                >
                  <td>{s.subjectCode}</td>
                  <td>{s.subjectName}</td>
                  <td>{s.subjectDescription}</td>
                  <td>{s.subjectLanguage}</td>
                  <td>{s.subjectForm}</td>
                  <td>
                    <button className="deleteBtn">삭제</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button
          onClick={onClickSubjectInsert}
          className={SubjectManagementCSS.btnRegist}
        >
          과목 등록
        </button>

        <div
          style={{
            listStyleType: "none",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {Array.isArray(subjectList) && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={SubjectManagementCSS.pagingBtn}
            >
              &lt;
            </button>
          )}
          {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
              <button
                style={
                  currentPage === num
                    ? { color: "#2F65EB", textDecoration: "underline" }
                    : null
                }
                className={SubjectManagementCSS.pagingBtn}
              >
                {num}
              </button>
            </li>
          ))}
          {Array.isArray(subjectList) && (
            <button
              className={SubjectManagementCSS.pagingBtn}
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
    </>
  );
}

export default SubjectManagement;
