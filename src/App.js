import {  BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/member/Login";
import Layout from "./layouts/Layout.js";
import OpenClassesLayout from "./layouts/OpenClassesLayout";
import ClassManagement from "./pages/classes/ClassManagement";
import ClassHistory from "./pages/classes/ClassHistory";
import FindId from "./pages/member/FindId";
import FindPwd from "./pages/member/FindPwd";
import TeacherManagement from "./pages/teacher/TeacherManagement";
import TeacherRegistration from "./pages/teacher/TeacherRegistration";
import SubjectRegistration from "./pages/classes/SubjectRegistration";
import SubjectManagement from "./pages/classes/SubjectManagement";
import SubjectSearch from "./pages/classes/SubjectSearch";
import SubjectUpdate from "./pages/classes/SubjectUpdate";
import FindMemLayout from "./layouts/FineMemLayout";
import TeacherUpdate from "./pages/teacher/TeacherUpdate";
import TeacherSearch from "./pages/teacher/TeacherSearch";

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
              <Route path="search" element={ <SubjectSearch/>} />
              <Route path="subject-registration" element={ <SubjectRegistration/> }/>
              <Route path="subject-update/:subjectCode" element={ <SubjectUpdate/> }/>
              <Route path="classes" element={ <ClassManagement/> }/>
              <Route path="classHistory" element={ <ClassHistory/> }/>
        </Route>

        <Route path="teacher" element={  <TeacherManagement/> }/>
              <Route path="teacher/regist" element={ <TeacherRegistration/> }/>
              <Route path="teacher-update/:memberCode" element={ <TeacherUpdate/> }/>
              <Route path="teachers/search" element={ <TeacherSearch/> }/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}
export default App;