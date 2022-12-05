import { Outlet } from 'react-router-dom';
import ConsLayoutCSS from "./ConsLayout.module.css"

function StudentLayout(){

    return (
        <>
        <main className={ ConsLayoutCSS.main }>
            <Outlet/>
        </main>
    </>
    );
}

export default StudentLayout;