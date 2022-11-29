import SmsTransmissionCSS from "./SmsTransmission.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callSmsListForAdminAPI } from "../../api/SmsListAPICall";

function SmsTransmission() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sms = useSelector((state) => state.smsListReducer);
  const smsList = sms.data;
  console.log("smsTransmission", smsList);

  const pageInfo = sms.pageInfo;

  const [currentPage, setCurrentPage] = useState(1);

  const pageNumber = [];
  if (pageInfo) {
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }
  //window.location.reload()
  useEffect(() => {
    dispatch(
      callSmsListForAdminAPI({
//        currentPage: currentPage,
        smsCode: useParams.smsCode
      })
    );
  },
// [currentPage]);
    []);

  return (
    <section className={SmsTransmissionCSS.container}>
      <div className={SmsTransmissionCSS.smsTitle}>
        <h1>문자 서비스</h1>
      </div>
      <article className={SmsTransmissionCSS.section}>
        <div className={SmsTransmissionCSS.backDiv}>
          <div className={SmsTransmissionCSS.div1}>
            <div className={SmsTransmissionCSS.selectBox}>
              <select>
                <option>검색유형</option>
              </select>
            </div>
            <div className={SmsTransmissionCSS.inputBox}>
              <input
                className={SmsTransmissionCSS.searchInput}
                type="text"
                placeholder="검색어를 입력하세요."
              ></input>
              <div className={SmsTransmissionCSS.searchResult}>내용</div>
            </div>
          </div>
          <div className={SmsTransmissionCSS.div2}>
            <h4>수신번호</h4>
            <div>내용</div>
          </div>
        </div>

        <div className={SmsTransmissionCSS.div5}>
          <div className={SmsTransmissionCSS.div3}>
            <h4>발신번호</h4>
            <div>010-0000-0000</div>
          </div>
          <div className={SmsTransmissionCSS.div4}>내용을 입력하세요</div>
        </div>
      </article>
    </section>
  );
}

export default SmsTransmission;
