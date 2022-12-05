import AccUpdateCSS from "./AccUpdate.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAccUpdateAPI } from "../../api/AccAPICalls";
import { callAccDetailForAdminAPI } from "../../api/AccListAPICall";

function AccUpdate() {
  const params = useParams();
  const accDetail = useSelector((state) => state.accListReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  console.log('acc 리듀서', accDetail);

  /* 읽기모드와 수정모드를 구분 */
  const [modifyMode, setModifyMode] = useState(false);

  /* 최초 랜더링 시 수납 상세 정보 조회 */
  useEffect(() => {
    dispatch(callAccDetailForAdminAPI({
        accCode: params.accCode
      }));
    },
  []);

  /* 입력 양식의 값 변경될 때 */
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  /* 수정 모드 변경 이벤트 */
  const onClickModifyModeHandler = () => {
    setModifyMode(true);
    setForm({
      accCode: accDetail.accCode,
      // memberCode: accDetail.memberCode,
      memberName: accDetail.memberName,
      memberPhone: accDetail.memberPhone,
      // classCode: accDetail.classCode,
      className: accDetail.className,
      classPrice: accDetail.classPrice,
      accDate: accDetail.accDate,
      accOption: accDetail.accOption,
      accStatus: accDetail.accStatus,
      accContent: accDetail.accContent
    });
  };


  /* 수납 수정 저장 버튼 클릭 이벤트 */
  const onClickAccUpdateHandler = () => {
    // const formData = new FormData();
    // formData.append("accCode", form.accCode);
    // // formData.append("memberName", form.memberName);
    // // formData.append("memberPhone", form.memberPhone);
    // // formData.append("className", form.className);
    // // formData.append("classPrice", form.classPrice);
    // formData.append("accDate", form.accDate);
    // formData.append("accOption", form.accOption);
    // formData.append("accStatus", form.accStatus);
    // formData.append("accContent", form.accContent);

    dispatch(callAccUpdateAPI({
        form: form
      }));
    alert("수납 내역이 수정되었습니다.");
    navigate("/ono/acc", { replace: true });
  }

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}
        >
          취소
          </button>
        {!modifyMode && 
          <button onClick={onClickModifyModeHandler}
          >
            작성하기
            </button>
        }
        {modifyMode && 
          <button onClick={onClickAccUpdateHandler}>
            작성완료
          </button>
        }
      </div>
      <div className={AccUpdateCSS.accSection}>
        <div className={AccUpdateCSS.accInfoDiv}>
          <table>
            <tbody>
            <tr>
                <td>
                  <label>이름</label>
                </td>
                <td>
                  <input
                    name="memberName"
                    placeholder="이름"
                    className={AccUpdateCSS.AccInfoInput}
                    onChange={onChangeHandler}
                    value={(!modifyMode ? accDetail.classesHistory?.member.memberName : accDetail.classesHistory?.member.memberName) || ""}
                    readOnly={modifyMode ? false : true}
                    style={!modifyMode ? { backgroundColor: "gray" } : null}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>번호</label>
                </td>
                <td>
                  <input
                    name="memberPhone"
                    placeholder="번호"
                    className={AccUpdateCSS.AccInfoInput}
                    onChange={onChangeHandler}
                    value={(!modifyMode ? accDetail.classesHistory?.member.memberPhone : accDetail.classesHistory?.member.memberPhone) || ""}
                    readOnly={modifyMode ? false : true}
                    style={!modifyMode ? { backgroundColor: "gray" } : null}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>과목</label>
                </td>
                <td>
                  <input
                    name="className"
                    placeholder="과목"
                    className={AccUpdateCSS.AccInfoInput}
                    onChange={onChangeHandler}
                    value={(!modifyMode ? accDetail.classesHistory?.openClasses.className : accDetail.classesHistory?.openClasses.className) || ""}
                    readOnly={modifyMode ? false : true}
                    style={!modifyMode ? { backgroundColor: "gray" } : null}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>수강료</label>
                </td>
                <td>
                  <input
                    name="classPrice"
                    placeholder="수강료"
                    className={AccUpdateCSS.AccInfoInput}
                    onChange={onChangeHandler}
                    value={(!modifyMode ? accDetail.classesHistory?.openClasses.classPrice : accDetail.classesHistory?.openClasses.classPrice) || ""}
                    readOnly={modifyMode ? false : true}
                    style={!modifyMode ? { backgroundColor: "gray" } : null}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>수납일</label>
                </td>
                <td>
                  <input
                    name="accDate"
                    placeholder="수납일"
                    className={AccUpdateCSS.AccInfoInput}
                    onChange={onChangeHandler}
                    value={(!modifyMode ? accDetail.accDate : form.accDate) || ""}
                    readOnly={modifyMode ? false : true}
                    style={!modifyMode ? { backgroundColor: "gray" } : null}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>결제방법</label>
                </td>
                <td>
                  <input
                    name="accOption"
                    placeholder="결제방법"
                    className={AccUpdateCSS.accInfoInput}
                    onChange={onChangeHandler}
                    value={(!modifyMode ? accDetail.accOption : form.accOption) || ""}
                    readOnly={modifyMode ? false : true}
                    style={!modifyMode ? { backgroundColor: "gray" } : null}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>수납상태</label>
                </td>
                <td>
                  <input
                    name="accStatus"
                    placeholder="수납상태"
                    className={AccUpdateCSS.accInfoInput}
                    onChange={onChangeHandler}
                    value={(!modifyMode ? accDetail.accStatus : form.accStatus) || ""}
                    readOnly={modifyMode ? false : true}
                    style={!modifyMode ? { backgroundColor: "gray" } : null}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>수납메모</label>
                </td>
                <td>
                  <label>
                    <input
                      name="accContent"
                      placeholder="수납메모"
                      className={AccUpdateCSS.subjectInfoInput}
                      onChange={onChangeHandler}
                      value={(!modifyMode ? accDetail.accContent : form.accContent) || 0}
                      readOnly={modifyMode ? false : true}
                      style={!modifyMode ? { backgroundColor: "gray" } : null}
                    />
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AccUpdate;
