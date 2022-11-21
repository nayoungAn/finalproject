import { NavLink } from 'react-router-dom';
import NavCSS from './Navbar.module.css';

function Navbar(){

    return(
        <div className={ NavCSS.NavbarDiv }>
            <ul className={ NavCSS.NavlistUl }>
                <li><NavLink to="/"><button>공지사항</button></NavLink></li>
                <li><NavLink to="/"><button>내 정보</button></NavLink></li>
                <li><NavLink to="/"><button>내 강의</button></NavLink></li>
                <li><NavLink to="/"><button>1:1 상담</button></NavLink></li>
            </ul>
        </div>
    )

}

export default Navbar;