import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callNoticeDetailAPI } from '../../api/NoticeAPICalls';
import NoticeDetailCSS from './StudentNoticeDetail.module.css';

function StudentNoticeDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const noticeDetail = useSelector(state => state.noticeReducer);
    const params = useParams();
    
    
    useEffect(
        () => {
            dispatch(callNoticeDetailAPI({
                noticeCode : params.noticeCode
            }));
        },
        []
    );

    console.log(noticeDetail);
    
  

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
                                        value={ (noticeDetail.noticeCode) || '' }
                                        readOnly={ true }
                                        
                                    />
                                </td>
                                <td>
                                    <input 
                                        name='noticeTitle'
                                        placeholder='제목'
                                        className={ NoticeDetailCSS.subjectInfoInput }
                                        value={ (noticeDetail.noticeTitle) || '' }
                                        readOnly={ true }
                                        
                                    />
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="noticeDate"  
                                            placeholder='작성일'
                                            className={ NoticeDetailCSS.subjectInfoInput }
                                            value={ (noticeDetail.noticeDate) || '' }
                                            readOnly={ true }
                                            
                                            /> 
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input 
                                            name="memberName"  
                                            placeholder='작성자'
                                            className={ NoticeDetailCSS.subjectInfoInput }
                                            value={ (noticeDetail.member?.memberName) || '' }
                                            readOnly={ true }
                                            
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
                                            value={ (noticeDetail.noticeContent) || '' }
                                            readOnly={ true }
                                            
                                            /> 
                                    </label>
                                </td>
                            </tr>    
                        </tbody>                        
                    </table>
                </div>
            </div>
            <div>
                
            </div>        
        </div>
    </>
    );

}

export default StudentNoticeDetail;