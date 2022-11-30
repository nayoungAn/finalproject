import ClassHistoryCSS from "./ClassHistoryModal.module.css";
import ClassRegistrationCSS from "../../../pages/classes/ClassRegistration.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callClassHistoryRegistAPI } from "../../../api/ClassHistoryAPICalls";
import { callClassListForAdminNoPagingAPI } from "../../../api/ClassAPICalls";
import { callStudentManagerDetailAPI } from "../../../api/ClassHistoryRefreshAPICalls"
function ClassHistoryRegistModal({ setClassHistoryRegistModal }) {

  const classList = useSelector((state) => state.classReducer);
  const member = useSelector(state => state.studentManagerDetailReducer);

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    classCode: 0,
    memberCode: member.memberCode,
    startDate: ""
  });

  useEffect(() => {
    dispatch(callClassListForAdminNoPagingAPI({

    }));
    }, []);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickRegistHandler = () => {

    dispatch(
      callClassHistoryRegistAPI({
        form: form
        
      }));
    // dispatch(
    //     callStudentManagerDetailAPI ({
    //       memberCode : form.memberCode      
    //     }));
    setClassHistoryRegistModal(false);
    alert("수강등록이 완료되었습니다.");
      
  };

  
  /* 강의 속성 값 데이터 가공*/ 
  if(classList){
  for(var i =0; i < classList.length; i++){
    if(form.classCode ==classList[i].classCode){
      var arr = []
      arr = classList[i]
      var str = arr?.classStartDate.split('T',1) || ''   
       str += " ~ "
       str +=  arr?.classEndDate.split('T',1) || ''
    }
    }
}

  
  return (
    <div className={ClassHistoryCSS.modal}>
      <div className={ClassHistoryCSS.modalContainer}>
        <div className={ClassHistoryCSS.loginModalDiv}>
            {classList && (
          <table>
            {Array.isArray(classList) && (
              <tbody>
                <tr>
                  <td><label>강의명</label></td>
                  <td>
                    <select
                      id="classList"
                      name='classCode'
                      placeholder='강의명'
                      className={ClassRegistrationCSS.classInfoInput}
                      onChange={onChangeHandler}
                    >
                      <option>강의명</option>
                      {classList.map((item, idx) => (
                         <option key={idx} name='classCode' value={item?.classCode}>
                          {item?.className}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label> 과목명</label>
                  </td>
                  <td>
                    <input
                      name="subjectName"
                      placeholder="과목명"
                      className={ClassRegistrationCSS.classInfoInput}
                      value={arr?.subject.subjectName || ''}
                      readOnly={true}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>수강 정원</label>
                  </td>
                  <td>
                    <input
                      name="classQuota"
                      placeholder="수강 정원"
                      className={ClassRegistrationCSS.classInfoInput}
                      value={arr?.classQuota || ''}
                      readOnly = {true}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>수업일</label>
                  </td>
                  <td>
                    <label>
                      <input
                        name="classStartDate"
                        placeholder="2022-10-15"
                        className={ClassRegistrationCSS.classInfoInput}
                        value={str || ''}
                        readOnly = {true}
                      />
                    </label>
                  </td>
                  </tr>
                <tr>
                  <td>
                    <label>수업료</label>
                  </td>
                  <td>
                    <label>
                      <input
                        name="classPrice"
                        placeholder="800000"
                        className={ClassRegistrationCSS.classInfoInput}
                        value={arr?.classPrice || ''}
                        readOnly = {true}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>수강 시작일</label>
                  </td>
                  <td>
                    <label>
                      <input
                        name="startDate"
                        placeholder="2022-10-15"
                        className={ClassRegistrationCSS.classInfoInput}
                        onChange={onChangeHandler}
                      />
                    </label>
                  </td>
                </tr>
              </tbody>
              
            )}
          </table>
          
          )}
            <button  style={{
                    border: "none",
                    margin: 0,
                    fontSize: "20px",
                    height: "10px",
                    color: "black"
                  }}
                  onClick={onClickRegistHandler}>등록</button>
                <button
                  style={{
                    border: "none",
                    margin: 0,
                    fontSize: "20px",
                    height: "10px",
                    color: "black"
                  }}
                  onClick={() => setClassHistoryRegistModal(false)}
                >
                  돌아가기
                </button>
        </div>
      
      </div>
    </div>
  );
}

export default ClassHistoryRegistModal;
