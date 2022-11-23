import {  BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/member/Login";
import Layout from "./layouts/Layout.js";
import OpenClassesLayout from "./layouts/OpenClassesLayout";
import OpenClasses from "./pages/classes/OpenClasses";
import Subjects from "./pages/classes/Subjects";
import ClassHistory from "./pages/classes/ClassHistory";
import FindMemLayout from "./layouts/FindMemLayout";
import FindId from "./pages/member/FindId";
import FindPwd from "./pages/member/FindPwd";
function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Login/>}/>
      <Route path="/ono" element={ <Layout/>}/>

      <Route path="findmeminfo" element= { <FindMemLayout/>}>
        <Route index element={ <Navigate to= "/findmeminfo/find-pwd" replace/> }/>
        <Route path="find-id" element={ <FindId/>}/>
        <Route path="find-pwd" element={ <FindPwd/>}/>
      </Route>
      
      <Route path="OpenClasses" element={ <OpenClassesLayout/> }>
            <Route index element={ <Navigate to="/OpenClasses/subjects" replace /> } />
            <Route path="subjects" element={ <Subjects/> }/>
            <Route path="classes" element={ <OpenClasses/> }/>
            <Route path="classHistory" element={ <ClassHistory/> }/>
      </Route>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
