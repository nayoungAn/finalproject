import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callNoticeDetailAPI } from '../../api/NoticeAPICalls';
import { callNoticeUpdateAPI } from '../../api/NoticeAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import NoticeDetailCSS from './NoticeDetail.module.css';

function NoticeDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const noticeDetail = useSelector(state => state.noticeReducer);
    const params = useParams();
    
    const [form, setForm] = useState({});

    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

    useEffect(
        () => {
            dispatch(callNoticeDetailAPI({
                noticeCode : params.noticeCode
            }));
        },
        []
    );

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    /* 수정 모드 변경 이벤트 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            noticeCode : noticeDetail.noticeCode,
            noticeTitle : noticeDetail.noticeTitle,
            noticeContent : noticeDetail.noticeContent,
            noticeDate : noticeDetail.noticeDate,
            memberName : noticeDetail.member.memberName
        });
    }

    /* 수정 버튼 */
    const onClickSubjectUpdateHandler = () => {

        const formData = new FormData();

        formData.append("noticeCode", form.noticeCode);
        formData.append("noticeTitle", form.noticeTitle);
        formData.append("noticeContent", form.noticeContent);
        formData.append("noticeDate", form.noticeDate);
        formData.append("memberName", form.memberName);
        
        dispatch(callNoticeUpdateAPI({
            form : formData
        }));
        alert('공지사항이 수정되었습니다.');
        navigate('/ono/notice', { replace : true });
    }

    return (
        <>
            <div>
                <h2 className={NoticeDetailCSS.h2}> 공지사항 상세 조회</h2>
            <div className={ NoticeDetailCSS.subjectSection }>
                
                <div className={ NoticeDetailCSS.noticeInfoDiv }>
                    
                    <table className={ NoticeDetailCSS.noticeTable}>
                        <thead>
                            <tr>    
                                <th><label>번호</label></th>
                                <th><label>제목</label></th>
                                <th><label>작성일</label></th>
                                <th><label>작성자</label></th>
                                
                            </tr>    
                        </thead>
                        <tbody>
                            
                            <tr>
                            <td>
                                    <input 
                                        name='noticeCode'
                                        placeholder='번호'
                                        className={ NoticeDetailCSS.noticeInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (noticeDetail.noticeCode) || '' }
                                        readOnly={ true }
                                        style={ modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                                <td>
                                    <input 
                                        name='noticeTitle'
                                        placeholder='제목'
                                        className={ NoticeDetailCSS.noticeInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? noticeDetail.noticeTitle : form.noticeTitle) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="noticeDate"  
                                            placeholder='작성일'
                                            className={ NoticeDetailCSS.noticeInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (noticeDetail.noticeDate)?.split(' 00',1) || '' }
                                            readOnly={ true }
                                            style={ modifyMode ? { backgroundColor : 'gray'} : null }
                                            /> 
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="memberName"  
                                            placeholder='작성자'
                                            className={ NoticeDetailCSS.noticeInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (noticeDetail.member?.memberName) || '' }
                                            readOnly={ true }
                                            style={ modifyMode ? { backgroundColor : 'gray'} : null }
                                            /> 
                                    </label>
                                </td>
                            </tr>    
                            <tr>
                                <td colSpan={4}>
                                    <label>
                                        <textarea
                                            name="noticeContent"  
                                            placeholder='내용'
                                            className={ NoticeDetailCSS.noticeContentInput }
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? noticeDetail.noticeContent : form.noticeContent) || '' }
                                            readOnly={ modifyMode ? false : true }
                                            style={ modifyMode ? { backgroundColor : 'lightgray'} : null }
                                            /> 
                                    </label>
                                </td>
                            </tr>    
                        </tbody>                        
                    </table>
                </div>
            </div>
            <div className={NoticeDetailCSS.backBtn}>
                <button                  
                     onClick={ () => navigate(-1) }  
                     className={ NoticeDetailCSS.btnCancle}          
                        >
                            돌아가기
                </button>
            </div>
            { decoded === "ROLE_ADMIN" &&
                <div>
                    
                    
                {!modifyMode &&
                    <button 
                        onClick={ onClickModifyModeHandler }
                        className={ NoticeDetailCSS.ModifyBtn}
                    >
                        수정 모드
                    </button>
                }
                {modifyMode &&
                    <button 
                        onClick={ onClickSubjectUpdateHandler }
                        className={ NoticeDetailCSS.RegistBtn}
                    >
                        저장
                    </button>
                }
                </div>        
            }
        </div>
    </>
    );

}

export default NoticeDetail;