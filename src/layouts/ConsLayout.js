import { Outlet } from 'react-router-dom';
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ConsLayoutCSS from "./ConsLayout.module.css"

function ConsLayout(){

    return (
        <>
        <Header/>
        <Navbar/>
        <main className={ ConsLayoutCSS.main }>
            <Outlet/>
        </main>
        <Footer/>
    </>
    );
}

export default ConsLayout;