import {  BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/member/Login";
import Layout from "./layouts/Layout.js";
import OpenClassesLayout from "./layouts/OpenClassesLayout";
import OpenClasses from "./pages/classes/OpenClasses";
import Subjects from "./pages/classes/Subjects";
import ConsLayout from "./layouts/ConsLayout";
import ConsMain from "./pages/cons/ConsMain";
import ConsDetail from "./pages/cons/ConsDetail";
import SubjectManagement from "./pages/classes/SubjectManagement";
import SubjectUpdate from "./pages/classes/SubjectUpdate"
import ClassHistory from "./pages/classes/ClassHistory";
import FindId from "./pages/member/FindId";
import FindPwd from "./pages/member/FindPwd";
import TeacherManagement from "./pages/teacher/TeacherManagement";
import TeacherRegistration from "./pages/teacher/TeacherRegistration";
import SubjectRegistration from "./pages/classes/SubjectRegistration";
import FindMemLayout from "./layouts/FineMemLayout";
import TeacherUpdate from "./pages/teacher/TeacherUpdate";
import ConsRegistration from "./pages/cons/ConsRegistration";
import Teacherclass from "./pages/teacherclass/teacherclass";
import AccManagement from "./pages/acc/AccManagement";
import AccRegistration from "./pages/acc/AccRegistration";
import AccUpdate from "./pages/acc/AccUpdate";
import SmsManagement from "./pages/sms/SmsManagement";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Login/>}/>
      <Route path="findmeminfo" element= { <FindMemLayout/>}>
        <Route index element={ <Navigate to= "/findmeminfo/find-pwd" replace/> }/>
        <Route path="find-id" element={ <FindId/>}/>
        <Route path="find-pwd" element={ <FindPwd/>}/>
      </Route>

     <Route path="/ono" element={ <Layout/>}>
        <Route path="OpenClasses" element={ <OpenClassesLayout/> }>
              <Route index element={ <Navigate to="subjects" replace /> } />
              <Route path="subjects" element={ <SubjectManagement/> }/>
              <Route path="subject-registration" element={ <SubjectRegistration/> }/>
              <Route path="subject-update/:subjectCode" element={ <SubjectUpdate/> }/>
              <Route path="classes" element={ <OpenClasses/> }/>
              <Route path="classHistory" element={ <ClassHistory/> }/>
        </Route>

        <Route path="Cons" element={ <ConsLayout/> }>
            <Route index element={ <Navigate to="consMain" replace /> } />
            <Route path="consMain" element={ <ConsMain/> }/>
            <Route path="cons-registration" element={ <ConsRegistration/> }/>
            <Route path="consdetail/:consCode" element={ <ConsDetail/> }/>
       </Route>
            
        <Route path="teacher" element={  <TeacherManagement/> }>
              <Route path="teacher/regist" element={ <TeacherRegistration/> }/>
              <Route path="teacher-update/:memberCode" element={ <TeacherUpdate/> }/>
        </Route>

        <Route path="teacherclass" element={<Teacherclass/>}>
        </Route>

        <Route path="acc" element={<AccManagement />}>
        </Route>
        <Route path="acc-update/:accCode" element={<AccUpdate />} />
        <Route path="acc-Registration/:accCode" element={<AccRegistration />} />
        <Route path="sms" element={<SmsManagement />} >
        </Route>
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;