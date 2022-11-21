import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callConsDetailAPI } from '../../api/ConsAPICalls';
import ConsDetailCSS from './ConsDetail.module.css';
import { decodeJwt } from '../../utils/tokenUtils';


function ConsDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cons = useSelector(state => state.consReducer);
    const params = useParams();
    const consCode = params.consCode;
    const [amount, setAmount] = useState(1);
    const [loginModal, setLoginModal] = useState(false);

    useEffect(
        () => {
            dispatch(callConsDetailAPI({
                consCode : consCode
            }));
        },
        []
    );

    // /* 구매 수량 변화시 적용 */
    // const onChangeAmountHandler = (e) => {
    //     setAmount(e.target.value);
    // }

    // console.log('product', cons);

    // /* 구매하기 버튼 이벤트 */
    // const onClickPurchaseHandler = () => {

    //     // 1. 로그인 상태인지 확인
    //     const token = decodeJwt(window.localStorage.getItem("accessToken"));
    //     console.log('[onClickPurchaseHandler] token : ', token);

    //     if(!token) {
    //         alert("구매 전 로그인이 필요합니다.");
    //         setLoginModal(true);
    //         return;
    //     }

    //     // 2. 토큰이 만료 되었을 때 다시 로그인
    //     if(token.exp * 1000 < Date.now()) {
    //         setLoginModal(true);
    //         return;
    //     }

    //     // 3. 구매 가능 수량 확인
    //     if(amount > product.productStock) {
    //         alert("구매 가능 수량을 확인해주세요");
    //         return;
    //     }

    //     navigate(`/purchase?amount=${amount}`, { replace : false });
    // }

    // const onClickReviewHandler = () => {
    //     navigate(`/review/${params.productCode}`, { replace : false});
    // }

    return (
        <>
            
            <div className={ ConsDetailCSS.DetailDiv } >
                <div className={ ConsDetailCSS.imgDiv }>
                    <button
                        className={ ConsDetailCSS.reviewBtn }
                    >
                        리뷰보기
                    </button>
                </div>
                <div className={ ConsDetailCSS.descriptionDiv }>
                    <table className={ ConsDetailCSS.descriptionTable }>
                        <tbody>
                            <tr>
                                <th>상품 코드</th>
                                <td>{ cons.consCode || '' }</td>
                            </tr>
                            <tr>
                                <th>상품명</th>
                                <td>{ cons.consDate || '' }</td>
                            </tr>
                            <tr>
                                <th>상품 가격</th>
                                <td>{ cons.consName || '' }</td>
                            </tr>
                            <tr>
                                <th>상품 설명</th>
                                <td>{ cons.consGender || '' }</td>
                            </tr>
                            <tr>
                                <th>구매 가능 수량</th>
                                <td>{ cons.consBirth || '' }</td>
                            </tr>
                            <tr>
                                <th>구매 가능 수량</th>
                                <td>{ cons.consTitle || '' }</td>
                            </tr>
                            <tr>
                                <th>구매 가능 수량</th>
                                <td>{ cons.consDescription || '' }</td>
                            </tr>
                            <tr>
                                <th>구매 가능 수량</th>
                                <td>{ cons.consPhone || '' }</td>
                            </tr>
                            {/* <tr>
                                <th>구매 수량</th>
                                <td>
                                    <input
                                        type="number"
                                        min="0"
                                        value={ amount }
                                        onChange={ onChangeAmountHandler }
                                    />
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                    <button
                        className={ ConsDetailCSS.productBuyBtn }
                        // onClick={ onClickPurchaseHandler }
                    >
                        구매하기
                    </button>
                </div>
            </div>
        </>
    );

}

export default ConsDetail;