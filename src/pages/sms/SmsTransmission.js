import SmsTransmissionCSS from "./SmsTransmission.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callSearchListForAdminAPI } from "../../api/SmsListAPICall";
import { callSmsTransmissionAPI } from "../../api/SmsListAPICall";

function SmsTransmission() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sms = useSelector((state) => state.smsListReducer);
  const [smsList, setSmsList] = useState(sms);
  console.log("smsTransmission", sms);

  const onClickSmsInsert = () => {
    navigate("/ono/sms", { replace: false });
  };

  /* 검색 키워드 입력 시 입력 값 상태 저장 */
  const onSearchChangeHandler = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  let checkedItemList = [];

  const checkHandler = (item) => {
    console.log("item = ", item);
  };

  /* 전송 버튼 클릭 이벤트 */
  const onClickSmsTransmissionHandler = () => {

    dispatch(callSmsTransmissionAPI({
        //?
    }));

    alert('전송이 완료 되었습니다.');
    navigate("/ono/sms/", { replace : true });

}

  useEffect(() => {
    dispatch(callSearchListForAdminAPI(searchValue));
  }, [searchValue]);

  useEffect(() => {
    setSmsList(sms);
  }, [sms]);

  useEffect(() => {}, [checkedItemList]);

  return (
    <section className={SmsTransmissionCSS.container}>
      <div className={SmsTransmissionCSS.smsTitle}>
        <h1>문자 서비스</h1>
      </div>
      <article className={SmsTransmissionCSS.section}>
        <div className={SmsTransmissionCSS.backDiv}>
          <div className={SmsTransmissionCSS.div1}>
            {/* <div className={SmsTransmissionCSS.selectBox}>
              <select>
                <option hidden selected>
                  검색유형
                </option>
                <option>학생명</option>
                <option>강의명</option>
              </select>
            </div> */}
            <div className={SmsTransmissionCSS.inputBox}>
              <input
                className={SmsTransmissionCSS.searchInput}
                type="text"
                placeholder="검색어를 입력하세요."
                value={searchValue}
                onChange={onSearchChangeHandler}
              ></input>
              {/* <button onClick={onClickSmsInsert}>확인</button> */}
              {sms.map((item) => {
                return (
                  <div
                    className={SmsTransmissionCSS.searchResult1}
                    key={item.member.memberCode}
                    isChecked={false}
                    onClick={() => checkHandler(item)}
                  >
                    {item.member.memberName} {item.member.memberPhone}{" "}
                    {item.openClasses.className}
                  </div>
                );
              })}
            </div>
          </div>
          {/* <div className={SmsTransmissionCSS.div2}>
            <h4>수신번호</h4>
            <div>010-0000-0000</div>
          </div> */}
        </div>

        {/* <div className={SmsTransmissionCSS.div4}> */}
        {/* <div className={SmsTransmissionCSS.div3}>
            <h4>발신번호</h4>
            <div>010-0000-0000</div>
          </div> */}
        <div className={SmsTransmissionCSS.searchResult3}>
          <div className={SmsTransmissionCSS.searchResult2}>
            내용을 입력하세요
          </div>
          <div className={SmsTransmissionCSS.div2}>
            <button onClick={ onClickSmsTransmissionHandler }>전송</button>
          </div>
        </div>

        {/* </div> */}
      </article>
    </section>
  );
}

export default SmsTransmission;
