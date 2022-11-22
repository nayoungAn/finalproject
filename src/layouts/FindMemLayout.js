import FidMemInfoNav from '../components/common/FindMemInfoNav'
import { Outlet } from 'react-router-dom';
function FindMemLayout(){

    return(
        
        <> 
            <FidMemInfoNav/>
            
            <main>
                <Outlet/>
            </main>

        </>
    );
}

export default FindMemLayout;