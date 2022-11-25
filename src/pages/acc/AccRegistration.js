import AccRegistrationCSS from "./AccRegistration.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { callAccRegistAPI } from "../../api/AccAPICalls";

function AccRegistration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    accDate: "",
    accOption: "",
    accContent: "",
  });

  /* 입력 양식의 값 변경될 때 */
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* 상품 등록 버튼 클릭 이벤트 */
  const onClickAccRegistrationHandler = () => {
    const formData = new FormData();

    formData.append("accDate", form.accDate);
    formData.append("accOption", form.accOption);
    formData.append("accContent", form.accContent);

    dispatch(
      callAccRegistAPI({
        form: formData,
      })
    );

    alert("수납내역이 등록되었습니다.");
    navigate("/ono/acc/acc", { replace: true });
    // window.location.reload()
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>취소</button>
        <button onClick={onClickAccRegistrationHandler}>작성하기</button>
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
                    className={AccRegistrationCSS.accInfoInput}
                    onChange={onChangeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label> 결제방법</label>
                </td>
                <td>
                  <input
                    name="accOption"
                    placeholder="결제방법"
                    className={AccRegistrationCSS.accInfoInput}
                    onChange={onChangeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>수납메모</label>
                </td>
                <td>
                  <input
                    name="accContent"
                    placeholder="수납메모"
                    className={AccRegistrationCSS.accInfoInput}
                    onChange={onChangeHandler}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AccRegistration;
