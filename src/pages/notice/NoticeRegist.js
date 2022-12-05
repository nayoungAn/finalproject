import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callNoticeRegistAPI } from '../../api/NoticeAPICalls';
import NoticeDetailCSS from './NoticeDetail.module.css';

function NoticeRegist() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        noticeTitle : '',
        noticeContent : ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    /* 등록 버튼 */
    const onClickSubjectUpdateHandler = () => {

        const formData = new FormData();

        formData.append("noticeTitle", form.noticeTitle);
        formData.append("noticeContent", form.noticeContent);
        
        dispatch(callNoticeRegistAPI({
            form : formData
        }));
        alert('공지사항이 등록되었습니다.');
        navigate('/ono/notice', { replace : true });
    }

    return (
        <>
        <div>
        <div className={ NoticeDetailCSS.subjectSection }>
            <div className={ NoticeDetailCSS.noticeInfoDiv }>
                <table className={ NoticeDetailCSS.noticeRegistTable }>
                    <tbody>
                        <tr>
                            <td><label>제목</label></td>
                        </tr>    
                        <tr>
                            <td>
                                <input 
                                    name='noticeTitle'
                                    placeholder='제목'
                                    className={ NoticeDetailCSS.noticeRegistTitle }
                                    onChange={ onChangeHandler }
                                    value={ (form.noticeTitle) || '' }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>내용</label></td>
                        </tr>
                        <tr>
                            <td>
                                <textarea 
                                    name='noticeContent'
                                    placeholder='내용'
                                    className={ NoticeDetailCSS.noticeRegistContent }
                                    onChange={ onChangeHandler }
                                    value={ (form.noticeContent) || '' }
                                />
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
        
            <button 
                onClick={ onClickSubjectUpdateHandler }
            >
                저장하기
            </button>
        </div>        
    </div>
</>
    );

}

export default NoticeRegist;