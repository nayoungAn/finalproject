import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ClassDetailCSS from './ClassDetail.module.css';
import { decodeJwt } from '../../utils/tokenUtils';

function ClassDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.studentManagerDetailReducer);

    return (
        <> 

            <div className={ ClassDetailCSS.DetailDiv } >
                <div className={ ClassDetailCSS.descriptionDiv }>
                    <table className={ ClassDetailCSS.descriptionTable }>
                        <tbody>
                           
                       
                            <tr>
                                <td rowSpan='2'><img src={ member.memberImageUrl } alt="테스트"/></td>
                                <td>이름 { member.memberName || '' }</td>
                            </tr>
                            <tr>                          
                                <td>아이디{ member.memberId || '' }</td>
                            </tr>
                            <tr>
                                <td>생년월일</td>
                                <td>{ member.memberBirthday || '' }</td>
                                <td>휴대번호</td>
                                <td>{ member.memberPhone || '' }</td>
                            </tr>
                            <tr>
                            <td>성별</td>
                                <td><input 
                                        type="radio" 
                                        name="memberGender"  
                                        value="여성"
                                        readOnly={true }
                                        checked={ member?.memberGender === '여성' ? true : false }
                                    /> 
                                        여성&nbsp;
                                </td> 
                                <td>
                                    <input 
                                        type="radio" 
                                        name="memberGender"  
                                        value="남성"
                                        readOnly={true }
                                        checked={ member?.memberGender  === '남성' ? true : false }
                                    /> 남성</td>
                                <td>이메일</td>
                                <td>{ member.memberEmail || '' }</td>
                            </tr>
                            <tr><td>등록일</td>
                                <td>{ member.memberRegisterDate || '' }</td>
                            <td>상태 여부</td>
                            <td>{ member.memberStatus}</td>
                            </tr>
                            <tr>
                             <td>{ member.address}</td>
                            </tr>

                        </tbody>
                    </table>
                    </div>
                </div>
        </>
    );

}

export default ClassDetail;