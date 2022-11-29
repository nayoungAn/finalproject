import { Outlet } from 'react-router-dom';
import NoticeLayoutCSS from './NoticeLayout.module.css';

function NoticeLayout(){

    return (
        <>
            <div>
                <main className={ NoticeLayoutCSS.main }>
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default NoticeLayout;