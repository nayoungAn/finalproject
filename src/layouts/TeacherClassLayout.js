
import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer';
import TeacherClassNav from '../components/common/TeacherClassNav'
function FindMemLayout(){

    return(
        
        <> 
            <TeacherClassNav/>
            <main>
                <Outlet/>
            </main>
            

        </>
    );
}

export default FindMemLayout;