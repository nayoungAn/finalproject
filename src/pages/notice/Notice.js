import NoticeCSS from './Notice.module.css';
import { useNavigate } from 'react-router-dom';

function Notice({ notice : {noticeCode, noticeTitle, noticeDate, member}}) {

    const navigate = useNavigate();

    const onClickNoticeHandler = (noticeCode) => {

        navigate(`/notice/${noticeCode}`, { replace : false });
    }

    return (
        <div
            className={ NoticeCSS.noticeDiv }
            onClick={ () => onClickNoticeHandler(noticeCode) }
        >
                
                    <div width="5%">{ noticeCode }</div>
                    <div width="500px">{ noticeTitle }</div>
                    <div width="15%">{ noticeDate }</div>
                    <div width="25%">{ member.memberName }</div>
                    <div>
                    <button className="deleteBtn"
                >
                    삭제
                </button></div>
 
        </div>
    );

}

export default Notice;