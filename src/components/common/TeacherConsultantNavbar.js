import OpenClassesNavbarCSS from './OpenClassesNavbar.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import { Navigate, NavLink } from 'react-router-dom';

function OpenClassesNavbar() {

    /* accessToken 소지 및 유효 확인 */
    const token = decodeJwt(window.localStorage.getItem('accessToken'));

    if(token === undefined || token === null || token.exp * 1000 < Date.now()) {
        return <Navigate to="/" />;
    }

    return (
        <div className={ OpenClassesNavbarCSS.OpenClassesNavbarDiv }>
            <ul className={ OpenClassesNavbarCSS.OpenClassesNavbarUl }>

            <li><NavLink to="/ono/qna/teacher"> 1:1 상담</NavLink></li>
            <li><NavLink to="/"> 등록 상담</NavLink></li>

            </ul>
        </div>
    );

}                                              

export default OpenClassesNavbar;