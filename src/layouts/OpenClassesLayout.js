import { Outlet } from 'react-router-dom';
import OpenClassesLayoutCSS from './OpenClassesLayout.module.css';
import OpenClassesNavbar from '../components/common/OpenClassesNavbar';

function OpenClassesLayout(){

    return (
        <>
            <div className={ OpenClassesLayoutCSS.openClassesLayoutDiv }>
                <OpenClassesNavbar />
                <main className={ OpenClassesLayoutCSS.main }>
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default OpenClassesLayout;