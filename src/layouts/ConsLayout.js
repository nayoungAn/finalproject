import { Outlet } from 'react-router-dom';
import ConsLayoutCSS from "./ConsLayout.module.css"

function ConsLayout(){

    return (
        <>
        <main className={ ConsLayoutCSS.main }>
            <Outlet/>
        </main>
    </>
    );
}

export default ConsLayout;