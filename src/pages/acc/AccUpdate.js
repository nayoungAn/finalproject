import AccRegistrationCSS from "./AccRegistration.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAccUpdateAPI } from "../../api/AccAPICalls";
import { callAccDetailForAdminAPI } from "../../api/AccListAPICall";
function AccUpdate() {
  const params = useParams();
  const accDetail = useSelector((state) => state.accListReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  /* 읽기모드와 수정모드를 구분 */
  const [modifyMode, setModifyMode] = useState(false);

  /* 최초 랜더링 시 상품 상세 정보 조회 */
  useEffect(() => {
    dispatch(
      callAccDetailForAdminAPI({
        accCode: params.accCode,
      })
    );
  }, []);

  /* 입력 양식의 값 변경될 때 */
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* 수정 모드 변경 이벤트 */
  const onClickModifyModeHandler = () => {
    setModifyMode(true);
    setForm({
      accCode: accDetail.accCode,
      accDate: accDetail.accDate,
      accOption: accDetail.accOption,
      accContent: accDetail.accContent,
    });
  };

  /* 상품 수정 저장 버튼 클릭 이벤트 */
  const onClickAccUpdateHandler = () => {
    const formData = new FormData();

    formData.append("accCode", form.accCode);
    formData.append("accDate", form.accDate);
    formData.append("accOption", form.accOption);
    formData.append("accContent", form.accContent);

    dispatch(
      callAccUpdateAPI({
        form: formData,
      })
    );
    alert("수납 내역이 수정되었습니다.");
    navigate("/ono/acc", { replace: true });
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>돌아가기</button>
        {!modifyMode && (
          <button onClick={onClickModifyModeHandler}>수정 모드</button>
        )}
        {modifyMode && (
          <button onClick={onClickAccUpdateHandler}>
            수납 내역 수정 저장하기
          </button>
        )}
      </div>
      <div className={AccRegistrationCSS.accSection}>
        <div className={AccRegistrationCSS.accInfoDiv}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>수납일</label>
                </td>
                <td>
                  <input
                    name="accDate"
                    placeholder="수납일"
                    className={AccRegistrationCSS.AccInfoInput}
                    onChange={onChangeHandler}
                    value={
                      (!modifyMode ? accDetail.accDate : form.accDate) || ""
                    }
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
                    className={AccRegistrationCSS.accInfoInput}
                    onChange={onChangeHandler}
                    value={
                      (!modifyMode ? accDetail.accOption : form.accOption) || 0
                    }
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
                      className={AccRegistrationCSS.subjectInfoInput}
                      onChange={onChangeHandler}
                      value={
                        (!modifyMode
                          ? accDetail.accContent
                          : form.accContent) || 0
                      }
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
