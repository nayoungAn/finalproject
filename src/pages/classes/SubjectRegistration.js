import SubjectRegistrationCSS from "./SubjectRegistration.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callSubjectRegistAPI } from "../../api/SubjectAPICalls";

function SubjectRegistration() {
  const subjects = useSelector((state) => state.subjectListReducer);
 const subjectList = subjects.data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const arr = [];

  const [form, setForm] = useState({
    subjectName: "",
    subjectForm: "",
    subjectLanguage: "",
    subjectBook: "",
    subjectDescription: "",
    subjectLearningObjectives: "",
  });
 
  /* 과목명 중복 방지 */
  for(var i = 0; i < subjectList.length; i++) {
    
    arr.push(subjectList[i].subjectName);
  }


  /* 입력 양식의 값 변경될 때 */
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* 상품 등록 버튼 클릭 이벤트 */
  const onClickSubjectRegistrationHandler = () => {
   if(arr.includes(form.subjectName))
   {
    alert("과목명이 중복됩니다.")
   }
   else 
   {
    const formData = new FormData();

    formData.append("subjectName", form.subjectName);
    formData.append("subjectForm", form.subjectForm);
    formData.append("subjectLanguage", form.subjectLanguage);
    formData.append("subjectBook", form.subjectBook);
    formData.append("subjectDescription", form.subjectDescription);
    formData.append(
      "subjectLearningObjectives",
      form.subjectLearningObjectives
    );

    dispatch(
      callSubjectRegistAPI({
        form: formData,
      })
    );

    alert("과목이 등록되었습니다.");
    navigate("/ono/OpenClasses/subjects", { replace: true });
    }
  };
  return (
    <div>
      <h2> 과목 등록</h2>
      <div className={SubjectRegistrationCSS.subjectSection}>
        <div className={SubjectRegistrationCSS.subjectInfoDiv}>
          <table>
            <tbody>
              <tr>
                <td className={SubjectRegistrationCSS.subjectTableTd}>
                  <label>과목명</label>
                </td>
                <td className={SubjectRegistrationCSS.subjectTabletd}>
                  <input
                    name="subjectName"
                    placeholder="과목명"
                    className={SubjectRegistrationCSS.subjectInfoInput}
                    onChange={onChangeHandler}
                  />
                </td>
                <td className={SubjectRegistrationCSS.subjectTableTd}>
                  <label> 수업 형태</label>
                </td>
                <td className={SubjectRegistrationCSS.subjectTabletd}>
                  <input
                    name="subjectForm"
                    placeholder="수업 형태"
                    className={SubjectRegistrationCSS.subjectInfoInput}
                    onChange={onChangeHandler}
                  />
                </td>
                <td className={SubjectRegistrationCSS.subjectTableTd}>
                  <label>언어</label>
                </td>
                <td className={SubjectRegistrationCSS.subjectTabletd}>
                  <input
                    name="subjectLanguage"
                    placeholder="언어"
                    className={SubjectRegistrationCSS.subjectInfoInput}
                    onChange={onChangeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td className={SubjectRegistrationCSS.subjectTableTd}>
                  <label>교재</label>
                </td>
                <td
                  colSpan="2"
                  className={SubjectRegistrationCSS.subjectTabletd}
                >
                  <input
                    name="subjectBook"
                    placeholder="교재"
                    className={SubjectRegistrationCSS.subjectInfoInput}
                    onChange={onChangeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td className={SubjectRegistrationCSS.subjectTableTd}>
                  <label>과목 설명</label>
                </td>
                <td
                  colSpan="3"
                  className={SubjectRegistrationCSS.subjectTabletd}
                >
                  <input
                    name="subjectDescription"
                    placeholder="과목 설명"
                    className={SubjectRegistrationCSS.subjectInfoInput}
                    onChange={onChangeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td className={SubjectRegistrationCSS.subjectTableTd}>
                  <label>과목 학습 목표</label>
                </td>
                <td
                  colSpan="4"
                  className={SubjectRegistrationCSS.subjectTabletd}
                >
                  <textarea
                    className={SubjectRegistrationCSS.textAreaStyle}
                    name="subjectLearningObjectives"
                    onChange={onChangeHandler}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <button
          onClick={() => navigate(-1)}
          className={SubjectRegistrationCSS.btnCancle}
        >
          취소
        </button>
        <button
          className={SubjectRegistrationCSS.btnRegist}
          onClick={onClickSubjectRegistrationHandler}
        >
          과목 등록
        </button>
      </div>
    </div>
  );
}

export default SubjectRegistration;
