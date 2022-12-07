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
  const [smsList, setSmsList] = useState();
  const [msgContent, setMsgContent] = useState();
  console.log("searchValue =", searchValue);
  console.log("sms =", sms);
  console.log("smsList = ", smsList);
  const msgHandler = (e) => {
    const { value } = e.target;
    setMsgContent(value);
  };

  const onClickSmsInsert = () => {
    navigate("/ono/sms", { replace: false });
  };

  /* 검색 키워드 입력 시 입력 값 상태 저장 */
  const onSearchChangeHandler = (e) => {
    const { value } = e.target;
    console.log("value =", value);
    if (!value) {
      setSearchValue("");
      setSmsList([]);
    } else {
      setSearchValue(value);
    }
  };

  const checkHandler = (id) => {
    const settedList = smsList.map((item) => {
      if (item.memberCode === parseInt(id)) {
        const NList = {
          ...item,
          isChecked: !item.isChecked,
        };
        console.log("NList =", NList);
        return NList;
      } else {
        return item;
      }
    });
    setSmsList(settedList);
  };

  console.log("smsList = ", smsList);

  /* 전송 버튼 클릭 이벤트 */
  const onClickSmsTransmissionHandler = () => {
    const putList = [];
    smsList.map((item) => {
      if (item.isChecked) {
        putList.push(item);
      }
    });
    console.log("putList =", putList);
    dispatch(
      callSmsTransmissionAPI({
        memberList: putList,
        msgContent: msgContent,
      })
    );

    alert("전송이 완료 되었습니다.");
    navigate("/ono/sms/", { replace: true });
  };

  useEffect(() => {
    dispatch(callSearchListForAdminAPI(searchValue));
  },[searchValue])

  useEffect(() => {
    setSmsList(sms);
  }, [sms]);

  return (
    <section className={SmsTransmissionCSS.container}>
      <div className={SmsTransmissionCSS.smsTitle}>
        <h1 className={SmsTransmissionCSS.h1}>문자 서비스</h1>
      </div>
      <article className={SmsTransmissionCSS.section}>
        <div className={SmsTransmissionCSS.backDiv}>
          <div className={SmsTransmissionCSS.div1}>

            <div className={SmsTransmissionCSS.inputBox}>
              <input
                className={SmsTransmissionCSS.searchInput}
                type="text"
                placeholder="검색어를 입력하세요."
                value={searchValue}
                onChange={(e) => {
                  onSearchChangeHandler(e);
                }}
              ></input>
              {smsList?.map((item) => {
                console.log(item);
                if (item.isChecked) {
                  return (
                    <div
                      className={SmsTransmissionCSS.searchResult1}
                      key={item.memberCode}
                      ischecked={item.isChecked}
                      onClick={() => {
                        checkHandler(item.memberCode);
                      }}
                      style={{ backgroundColor: "#8499ca" }}
                    >
                      {item.memberName} {item.memberPhone} {item.className}
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={SmsTransmissionCSS.searchResult1}
                      key={item.memberCode}
                      ischecked={item.isChecked}
                      onClick={() => {
                        checkHandler(item.memberCode);
                        
                      }}
                      style={{backgroundColor: "transparent" }}
                    >
                      {item.memberName} {item.memberPhone} {item.className}
                    </div>
                  );
                }
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
          <textarea
            className={SmsTransmissionCSS.searchResult2}
            name={"messageContent"}
            value={msgContent}
            placeholder="내용을 입력하세요."
            onChange={(e) => msgHandler(e)}
          ></textarea>
          <div className={SmsTransmissionCSS.div2}>
            <button className={SmsTransmissionCSS.RegistBtn}
              onClick={() => {
                onClickSmsTransmissionHandler();
              }}
            >
              전송
            </button>
          </div>
        </div>

        {/* </div> */}
      </article>
    </section>
  );
}

export default SmsTransmission;