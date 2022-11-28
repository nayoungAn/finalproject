import { Outlet } from 'react-router-dom';
import ClassHistoryLayoutCSS from './ClassHistoryLayout.module.css';
import ClassHistoryNavbar from '../components/common/ClassHistoryNavbar';

function ClassHistoryLayout(){

    return (
        <>
            <div className={ ClassHistoryLayoutCSS.classHistoryLayoutDiv }>
                <ClassHistoryNavbar />
                <main className={ ClassHistoryLayoutCSS.main }>
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default ClassHistoryLayout;