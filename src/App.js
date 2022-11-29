import {  BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/member/Login";
import Layout from "./layouts/Layout.js";
import OpenClassesLayout from "./layouts/OpenClassesLayout";

import OpenClasses from "./pages/classes/OpenClasses";
import ConsLayout from "./layouts/ConsLayout";
import ConsMain from "./pages/cons/ConsMain";
import ConsDetail from "./pages/cons/ConsDetail";
import SubjectManagement from "./pages/classes/SubjectManagement";
import SubjectUpdate from "./pages/classes/SubjectUpdate"

import ClassManagement from "./pages/classes/ClassManagement";
import ClassUpdate from "./pages/classes/ClassUpdate";

import ClassHistory from "./pages/classes/ClassHistory";
import FindId from "./pages/member/FindId";
import FindPwd from "./pages/member/FindPwd";
import TeacherManagement from "./pages/teacher/TeacherManagement";
import TeacherRegistration from "./pages/teacher/TeacherRegistration";
import SubjectRegistration from "./pages/classes/SubjectRegistration";
import SubjectManagement from "./pages/classes/SubjectManagement";
import SubjectSearch from "./pages/classes/SubjectSearch";

import FindMemLayout from "./layouts/FineMemLayout";
import TeacherUpdate from "./pages/teacher/TeacherUpdate";
import QnaTeacher from "./pages/consultant/QnaTeacher";
import QnaDetail from "./pages/consultant/QnaDetail";
import Teacherclass from "./pages/teacherclass/Teacherclass";

import TeacherSearch from "./pages/teacher/TeacherSearch";
import ClassRegistration from "./pages/classes/ClassRegistration";

import ConsRegistration from "./pages/cons/ConsRegistration";
import TeacherclassDetail from "./pages/teacherclass/TeacherclassDetail";
import Teacherclass from "./pages/teacherclass/Teacherclass";
import AccManagement from "./pages/acc/AccManagement";
import AccRegistration from "./pages/acc/AccRegistration";
import AccUpdate from "./pages/acc/AccUpdate";
import SmsManagement from "./pages/sms/SmsManagement";

import TeacherClassLayout from "./layouts/TeacherClassLayout"


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Login/>}/>
     
      <Route path="findmeminfo" element= { <FindMemLayout/>}>
        <Route index element={ <Navigate to= "/findmeminfo/find-id" replace/> }/>
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
              <Route path="class-registration" element={ <ClassRegistration/> }/>
              <Route path="class-update/:classCode" element={ <ClassUpdate/> }/>
              <Route path="classHistory" element={ <ClassHistory/> }/>
        </Route>

        <Route path="teacher" element={  <TeacherManagement/> }/>
        <Route path="teacher/regist" element={ <TeacherRegistration/> }/>
        <Route path="teacher-update/:memberCode" element={ <TeacherUpdate/> }/>
        <Route path="teachers/search" element={ <TeacherSearch/> }/>

        <Route path="Cons" element={ <ConsLayout/> }>
            <Route index element={ <Navigate to="consMain" replace /> } />
            <Route path="consMain" element={ <ConsMain/> }/>
            <Route path="cons-registration" element={ <ConsRegistration/> }/>
            <Route path="consdetail/:consCode" element={ <ConsDetail/> }/>
        </Route>
        
        <Route path="tea" element={<TeacherClassLayout/>}>
              <Route index element={ <Navigate to="teacherclass/:classCode" replace/> } />
              <Route path="teacherclass/:classCode" element={<TeacherclassDetail/>} />
              <Route path="qna/:classCode" element={ <QnaTeacher/> }/>
              <Route path="qnaDetail/:mtmCode" element={ <QnaDetail/> }/>
              <Route path="qnaReply" element={ <QnaRegistration/>} />
        </Route>


        <Route path="teacherclass" element={<Teacherclass/>}>
        </Route> 
 


        <Route path="acc" element={<AccManagement />}>
        </Route>
        <Route path="acc-update/:accCode" element={<AccUpdate />} />
        <Route path="acc-Registration/:accCode" element={<AccRegistration />} />
        <Route path="sms" element={<SmsManagement />} ></Route>
       

        {/* 원생 */}
        <Route path="Student" element={<StudentLayout/>}>
          <Route index element={ <Navigate to="studentMyInfo" replace /> } />
          <Route path="studentMyInfo" element={ <StudentMyInfo/> }/>
          <Route path="studentClasses" element={ <StudentClasses/> }/>
          <Route path="studentClassesDetail" element={ <StudentClassesDetail/> }/>
          <Route path="studentQna/:classCode" element={ <StudentQnA/> }/>
          <Route path="studentQnaDetail/:mtmCode" element={ <StudentQnaDetail/> }/>
          <Route path="studentQnaRegistration" element={ <StudentQnaRegistration/> }/>
        </Route>
          
        
      </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;