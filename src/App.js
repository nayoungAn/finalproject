import {  BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/member/Login";
import Layout from "./layouts/Layout.js";
import OpenClassesLayout from "./layouts/OpenClassesLayout";
import OpenClasses from "./pages/classes/OpenClasses";
import ClassHistory from "./pages/classes/ClassHistory";
import FindMemLayout from "./layouts/FindMemLayout";
import FindId from "./pages/member/FindId";
import FindPwd from "./pages/member/FindPwd";
import TeacherManagement from "./pages/teacher/TeacherManagement";
import TeacherRegistration from "./pages/teacher/TeacherRegistration";
import SubjectRegistration from "./pages/classes/SubjectRegistration";
import SubjectManagement from "./pages/classes/SubjectManagement";
import SubjectUpdate from "./pages/classes/SubjectUpdate";
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

        <Route path="teacher" element={  <TeacherManagement/> }>
              <Route index element={ <Navigate to="/teacher" replace /> } />
              <Route path="/ono/teacher/regist" element={ <TeacherRegistration/> }/> 
        </Route>
      </Route>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
