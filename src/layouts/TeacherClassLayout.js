
import { Outlet } from 'react-router-dom';
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