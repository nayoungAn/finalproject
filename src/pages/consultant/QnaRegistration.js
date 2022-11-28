import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function QnaRegistration() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    
    const [ form, setForm ] = useState({
        mtmTitle : '',
        mtmDescription :'' 
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickQnaRegistrationHandler = () => {

        const formData = new FormData();

        formData.append("mtmTitle", form.mtmTitle);
        formData.append("mtmDescription", form.mtmDescription);

        dispatch(classQnaResistAPI({
            form : formData
        }));

        navigate(`/ono/tea/qna/${params.classCode}`, {replace:false})
        window.location.reload();
    }

    return(
        <div>
            <div className={ QnaRegistrationCSS.QnaButtonDiv }>
                <button
                    onClick={ () => navigate(-1) }
                >
                    돌아가기
                </button>
                <button
                    onClick={ onClickQnaRegistrationHandler }
                >
                    답변등록
                </button>
            </div>
        </div>
    )

    
}
