import {  BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/member/Login";
import Layout from "./layouts/Layout.js";
import OpenClassesLayout from "./layouts/OpenClassesLayout";
import OpenClasses from "./pages/classes/OpenClasses";
import Subjects from "./pages/classes/Subjects";
import ClassHistory from "./pages/classes/ClassHistory";
function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Login/>}/>
      <Route path="/ono" element={ <Layout/>}/>
      <Route index element = { <sung-jun/> } />
      
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
