import { useSelector } from 'react-redux';
import ClassDetailCSS from './ClassDetail.module.css';

function ClassDetail() {

    const member = useSelector(state => state.studentManagerDetailReducer);

    return (
        <> 

            <div className={ ClassDetailCSS.DetailDiv } >
                <div className={ ClassDetailCSS.descriptionDiv }>
                    <table className={ ClassDetailCSS.descriptionTable }>
                        <tbody>
                           
                       
                            <tr>
                                <td rowSpan='5' className={ClassDetailCSS.img}>
                                <img className={ClassDetailCSS.imgSize}
                                src={ member.memberImageUrl} alt="이미지"/></td>
                                <td className={ClassDetailCSS.memberTabletd}>이름 </td>
                                <td className={ClassDetailCSS.memberTableTd}>{ member.memberName || '홍길동' }</td>                        
                                <td className={ClassDetailCSS.memberTabletd}>아이디</td>
                                <td className={ClassDetailCSS.memberTableTd}>{ member.memberId || 'student1' }</td>
                            </tr>
                            <tr>
                                <td className={ClassDetailCSS.memberTabletd}>생년월일</td>
                                <td className={ClassDetailCSS.memberTableTd}>{ member.memberBirthday || '20**-**-**' }</td>
                                <td className={ClassDetailCSS.memberTabletd}>휴대번호</td>
                                <td className={ClassDetailCSS.memberTableTd}>{ member.memberPhone || '010-****-****' }</td>
                            </tr>
                            <tr>
                            <td className={ClassDetailCSS.memberTabletd}>성별</td>
                                <td className={ClassDetailCSS.memberTableTd}><input 
                                        type="radio" 
                                        name="memberGender"  
                                        value="여성"
                                        readOnly={true }
                                        checked={ member?.memberGender === '여성' ? true : false }
                                    /> 
                                        여성&emsp;
                                    <input 
                                        type="radio" 
                                        name="memberGender"  
                                        value="남성"
                                        readOnly={true }
                                        checked={ member?.memberGender  === '남성' ? true : false }
                                    /> 남성</td>
                                <td className={ClassDetailCSS.memberTabletd}>이메일</td>
                                <td className={ClassDetailCSS.memberTableTd}>
                                { member.memberEmail || 'example@google.com' }</td>
                            </tr>
                            <tr>
                                <td className={ClassDetailCSS.memberTabletd}>등록일</td>
                                <td className={ClassDetailCSS.memberTableTd}>
                                { member.memberRegisterDate || '20**-**-**' }</td>
                            <td className={ClassDetailCSS.memberTabletd}>상태 여부</td>
                            <td className={ClassDetailCSS.memberTableTd}>
                            { member.memberStatus || 'Y'}</td>
                            </tr>
                            <tr>
                            <td className={ClassDetailCSS.memberTabletd}>주소</td>
                            <td colSpan="2" className={ClassDetailCSS.memberTableTd}>
                            { member.address || '서울시 종로구'}</td>
                            </tr>

                        </tbody>
                    </table>
                    </div>
                </div>
        </>
    );

}

export default ClassDetail;