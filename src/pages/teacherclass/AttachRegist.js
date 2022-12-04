import {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { callAttachRegistAPI } from '../../api/AttachAPICall';
import AttachRegistCSS from'./AttachRegist.module.css';


function AttachRegist() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const attachList = useSelector(state => state.attachReducer);

    console.log(attachList.attachCode)
    const [form, setForm] =useState({
        attachCode: attachList.attachCode,
        attachTitle: '',
        attachFiles: '',
        attachNote: ''

     
    });

    const onChangeHandler =(e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
        console.log(e.target.value);
    }

    const onClickAttachHandler =() => {

        const formData = new FormData();

        formData.append("attachTitle", form.attachTitle);
        formData.append("attachFiles", form.attachFiles);
        formData.append("attachNote", form.attachNote);
        formData.append("attachDate", form.attachDate);

        dispatch(callAttachRegistAPI({
            form : formData
        }));

        alert('첨부파일이 등록되었습니다.');
        navigate('/ono/teacherclass/{classCode}/attach');
    }


    return(

        <>
        
        <table className={AttachRegistCSS.attachList}>

            <tr>
                <td>
                    <input 
                    name='attachTitle'
                    className={AttachRegistCSS.attachRegist}
                    onChange={ onChangeHandler }
                    value={(form.attachTitle) || ''}
                    />
                </td>
                <td>
                    <input
                    name="attachFiles"
                    className={AttachRegistCSS.attachRegist}
                    onChange={ onChangeHandler}
                    value={(form.attachFiles) || ''}
                    />
                </td>
                <td>
                    <input
                    name='attachNote'
                    className={AttachRegistCSS.attachRegist}
                    onChange={ onChangeHandler }
                    value={(form.attachNote) || ''}
                    />
                </td>

            </tr>

        </table>

        <button onClick={ onClickAttachHandler }>저장하기</button>

        </>
    );

}
export default AttachRegist;