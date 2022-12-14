import AccUpdateCSS from "./AccUpdate.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAccUpdateAPI } from "../../api/AccAPICalls";
import { callAccDetailForAdminAPI } from "../../api/AccListAPICall";

function AccUpdate() {
  const params = useParams();
  const accDetail = useSelector(state => state.accListReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  console.log('acc 리듀서', accDetail);

  /* 상세 조회와 수정을 구분 */
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

  /* 수정 진행 시 변경되는 이벤트 */
  const onClickModifyModeHandler = () => {
    setModifyMode(true);
    setForm({
      accCode: accDetail.accCode,
      memberName: accDetail.memberName,
      memberPhone: accDetail.memberPhone,
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
    dispatch(callAccUpdateAPI({
        form: form
      }));
    alert("수납 내역이 수정되었습니다.");
    navigate("/ono/acc", { replace: true });
  }

  return (
    <div className={AccUpdateCSS.title}>
      <div>
         <h2 className={AccUpdateCSS.h2}> 수납내역 상세 조회 </h2>
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
                      value={(!modifyMode ? accDetail.accContent : form.accContent) || ""}
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
      <div>
        <button onClick={() => navigate(-1)}
                  className={AccUpdateCSS.CancelBtn}
        >
          취소
          </button>
        {!modifyMode && 
          <button onClick={onClickModifyModeHandler}
          className={AccUpdateCSS.ModifyBtn}
          >
            작성하기
            </button>
        }
        {modifyMode && 
          <button onClick={onClickAccUpdateHandler}
          className={AccUpdateCSS.RegistBtn}>
            
            작성완료
          </button>
        }
      </div>
    </div>
  );
}

export default AccUpdate;