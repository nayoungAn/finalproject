// import ProductCSS from './Product.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import ClassHistoryItemCSS from './ClassHistoryItem.module.css';
import { callStudentManagerDetailForAdminAPI } from '../../api/StudentManagerDetailAPICall';
import { callStudentManagerDetailAPI} from '../../api/ClassHistoryAPICalls';
/* pros
properties의 약어, 컴포넌트 속성을 설정할 때 사용하는 요소
Main에서 Product 컴포넌트를 생성할 때 <Product product={ product(상품 정보가 담긴 객체) } />와 같이 생성하면
Product에서 전달 된 값을 꺼내서 사용할 수 있다. 구조 분해 할당을 이용해서 꺼낸다. */
function ClassHistoryItem({ member : {memberCode,memberName, memberId}}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickProductHandler = (memberCode) => {
        dispatch(
            callStudentManagerDetailForAdminAPI({
              memberCode : memberCode
            }),
            dispatch(
                callStudentManagerDetailAPI({
                memberCode : memberCode
            }))
          );
            
    }

    return (
        <div className = {ClassHistoryItemCSS.NavbarDiv}
        onClick={ () => onClickProductHandler(memberCode)} >
                 <ul className={ ClassHistoryItemCSS.NavlistUl }>
                    
            {/* // className={ ProductCSS.productDiv } */}
        
            <h5>{ memberName }         { memberId }</h5>
            <h5></h5>
            </ul>
        </div>
    );

}

export default ClassHistoryItem;