import { callSearchTeacherClassAPI } from "../../api/TeacherClassAPICall";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import TeacherClassCSS from "./Teacherclass.module.css";

function Teacherclass() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.teacherClassReducer);
  const classesList = classes.data;

  const pageInfo = classes.pageInfo;

  const [currentPage, setCurrentPage] = useState(1);

  const pageNumber = [];
  if (pageInfo) {
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }

  useEffect(() => {
    dispatch(
      callSearchTeacherClassAPI({
        currentPage: currentPage,
      })
    );
  }, [currentPage]);

  const onClickTeacherclass = (classCode) => {
    navigate(`/ono/tea/teacherclass/${classCode}`, { replace: false });
  };

  return (
    <>
      <div>
        {" "}
        <h3>내 강의 조회</h3>
      </div>

      <div>
        <table className={TeacherClassCSS.classtable}>
          <thead className={TeacherClassCSS.classhead}>
            <tr>
              <th>No.</th>
              <th>강의명</th>
              <th>시작일</th>
              <th>종료일</th>
              <th>강의진행상태</th>
              <th>담당강사</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(classesList) &&
              classesList.map((c) => (
                <tr
                  key={c.classCode}
                  onClick={() => onClickTeacherclass(c.classCode)}
                >
                  <td>{c.classCode}</td>
                  <td>{c.className}</td>
                  <td>{c.classStartDate}</td>
                  <td>{c.classEndDate}</td>
                  <td>{c.classStatus}</td>
                  <td>{c.member.memberName}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div style={{ listStyleType: "none", display: "flex" }}>
        {Array.isArray(classesList) && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={TeacherClassCSS.pagingBtn}
          >
            &lt;
          </button>
        )}

        {pageNumber.map((num) => (
          <li key={num} onClick={() => setCurrentPage(num)}>
            <button
              style={currentPage === num ? { backgroundColor: "blue" } : null}
              className={TeacherClassCSS.pagingBtn}
            >
              {num}
            </button>
          </li>
        ))}

        {Array.isArray(classesList) && (
          <button
            className={TeacherClassCSS.pagingBtn}
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
export default Teacherclass;
