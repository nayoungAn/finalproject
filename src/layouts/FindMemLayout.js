import FindMemInfoNav from '../components/common/FindMemInfoNav'
import { Outlet } from 'react-router-dom';
import FindMemCSS from './FindMemLayout.module.css';
function FindMemLayout(){

    return(
        
        <> 
            <div className={FindMemCSS.backgroundDiv}>
                <div className={FindMemCSS.findDiv}>
            <FindMemInfoNav/>
            <main className={FindMemCSS.main}>
                <Outlet/>
            </main>
            </div>
            </div>
        </>
    );
}

export default FindMemLayout;