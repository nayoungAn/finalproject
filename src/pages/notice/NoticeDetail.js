import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callNoticeDetailAPI } from '../../api/NoticeAPICalls';
import { callNoticeUpdateAPI } from '../../api/NoticeAPICalls';
import NoticeDetailCSS from './NoticeDetail.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import LoginModal from '../../components/common/LoginModal';

function NoticeDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const noticeDetail = useSelector(state => state.noticeReducer);
    const params = useParams();
    
    const [form, setForm] = useState({});

    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    useEffect(
        () => {
            dispatch(callNoticeDetailAPI({
                noticeCode : params.noticeCode
            }));
        },
        []
    );

    console.log(noticeDetail);


    /* 구매 수량 변화시 적용 */
    // const onChangeAmountHandler = (e) => {
    //     setAmount(e.target.value);
    // }

    //console.log('product', product);



    /* 등록하기 버튼 이벤트 */
    // const onClickInsertHandler = () => {

    //     // 1. 로그인 상태인지 확인
    //     const token = decodeJwt(window.localStorage.getItem("accessToken"));
    //     console.log('[onClickInsertHandler] token : ', token);

    //     if(!token) {
    //         alert("등록 전 로그인이 필요합니다.");
    //         setLoginModal(true);
    //         return;
    //     }

    //     // 2. 토큰이 만료 되었을 때 다시 로그인
    //     if(token.exp * 1000 < Date.now()) {
    //         setLoginModal(true);
    //         return;
    //     }

    //     navigate(`/notice`, { replace : false });
    // }

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
            noticeName : noticeDetail.member.memberName
        });
    }

    /* 수정 버튼 */
    const onClickSubjectUpdateHandler = () => {

        const formData = new FormData();

        formData.append("noticeCode", form.noticeCode);
        formData.append("noticeTitle", form.noticeTitle);
        formData.append("noticeContent", form.noticeContent);
        formData.append("noticeDate", form.noticeDate);
        formData.append("noticeName", form.noticeName);
        
        dispatch(callNoticeUpdateAPI({
            form : formData
        }));
        alert('공지사항이 수정되었습니다.');
        navigate('/ono/notice', { replace : true });
    }

    return (
        <>
            <div>
            <div className={ NoticeDetailCSS.subjectSection }>
                <div className={ NoticeDetailCSS.subjectInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>번호</label></td>
                                <td><label>제목</label></td>
                                <td><label>작성일</label></td>
                                <td><label>작성자</label></td>
                                
                            </tr>    
                            <tr>
                            <td>
                                    <input 
                                        name='noticeCode'
                                        placeholder='번호'
                                        className={ NoticeDetailCSS.subjectInfoInput }
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
                                        className={ NoticeDetailCSS.subjectInfoInput }
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
                                            className={ NoticeDetailCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (noticeDetail.noticeDate) || '' }
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
                                            className={ NoticeDetailCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (noticeDetail.member?.memberName) || '' }
                                            readOnly={ true }
                                            style={ modifyMode ? { backgroundColor : 'gray'} : null }
                                            /> 
                                    </label>
                                </td>
                            </tr>    
                            <tr>
                                <td colSpan={4}><label>내용</label></td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    <label>
                                        <textarea
                                            name="noticeContent"  
                                            placeholder='내용'
                                            className={ NoticeDetailCSS.subjectContentInput }
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
            <div>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
            {!modifyMode &&
                <button 
                    onClick={ onClickModifyModeHandler }
                >
                    수정 모드
                </button>
            }
            {modifyMode &&
                <button 
                    onClick={ onClickSubjectUpdateHandler }
                >
                    저장하기
                </button>
            }
            </div>        
        </div>
    </>
    );

}

export default NoticeDetail;