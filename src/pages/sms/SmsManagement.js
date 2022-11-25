import SmsManagementCSS from "./SmsManagement.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callSmsListForAdminAPI } from "../../api/SmsListAPICall";

function SmsManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sms = useSelector((state) => state.smsListReducer);
  const smsList = sms.data;
  console.log("smsManagement", smsList);

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
        currentPage: currentPage,
      })
    );
  }, [currentPage]);

  return (
    <section className={SmsManagementCSS.container}>
      <div className={SmsManagementCSS.smsTitle}>
        <h1>문자 서비스</h1>
      </div>
      <article className={SmsManagementCSS.section}>
        <div className={SmsManagementCSS.backDiv}>
          <div className={SmsManagementCSS.div1}>
            <div className={SmsManagementCSS.selectBox}>
              <select>
                <option>검색유형</option>
              </select>
            </div>
            <div className={SmsManagementCSS.inputBox}>
              <input
                className={SmsManagementCSS.searchInput}
                type="text"
                placeholder="검색어를 입력하세요."
              ></input>
              <div className={SmsManagementCSS.searchResult}>내용</div>
            </div>
          </div>
          <div className={SmsManagementCSS.div2}>
            <h4>수신번호</h4>
            <div>내용</div>
          </div>
        </div>

        <div className={SmsManagementCSS.div5}>
          <div className={SmsManagementCSS.div3}>
            <h4>발신번호</h4>
            <div>010-0000-0000</div>
          </div>
          <div className={SmsManagementCSS.div4}>내용을 입력하세요</div>
        </div>
      </article>
    </section>
  );
}

export default SmsManagement;
