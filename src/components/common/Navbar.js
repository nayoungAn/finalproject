import { NavLink, Link } from 'react-router-dom';
import NavCSS from './Navbar.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import {useRef, useState} from "react";
//import {classNames} from "classNames";
import useDetectClose from "../../hooks/useDetectCLose";


function Navbar(){


    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin){
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

    return(
        <div className={ NavCSS.NavbarDiv }>
            <ul className={ NavCSS.NavlistUl }>
                {/* 관리자 */}
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/"><button>공지사항</button></NavLink></li>}
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/"><button>원생관리</button></NavLink></li>}
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/"><button>강사관리</button></NavLink></li>}
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/"><button>강의관리</button></NavLink></li>}
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/"><button>수납관리</button></NavLink></li>}
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/Cons"><button>상담관리</button></NavLink></li>}
                {/* 강사 */}
                { decoded === "ROLE_TEACHER" &&<li><NavLink to="/"><button>공지사항</button></NavLink></li>}
                { decoded === "ROLE_TEACHER" &&<li><NavLink to="/"><button>강의관리</button></NavLink></li>}
                { decoded === "ROLE_TEACHER" &&<li><NavLink to="/"><button>원생관리</button></NavLink></li>}
                { decoded === "ROLE_TEACHER" &&<li><NavLink to="/"><button>1:1 상담</button></NavLink></li>}
                {/* 원생 */}
                { decoded === "ROLE_STUDENT" && <li><NavLink to="/"><button>공지사항</button></NavLink></li>}
                { decoded === "ROLE_STUDENT" && <li><NavLink to="/"><button>내 정보</button></NavLink></li>}
                { decoded === "ROLE_STUDENT" && <li><NavLink to="/"><button>내 강의</button></NavLink></li>}
                { decoded === "ROLE_STUDENT" && <li><NavLink to="/"><button>1:1 상담</button></NavLink></li>}
                

            </ul>
        </div>
    )

}

export default Navbar;