import {  BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/member/Login";
import Layout from "./layouts/Layout.js";
import OpenClassesLayout from "./layouts/OpenClassesLayout";
import OpenClasses from "./pages/classes/OpenClasses";
import Subjects from "./pages/classes/Subjects";
import ClassHistory from "./pages/classes/ClassHistory";
import ConsLayout from "./layouts/ConsLayout";
import ConsMain from "./pages/cons/ConsMain";
import ConsDetail from "./pages/cons/ConsDetail";
function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Login/>}/>
      <Route path="/ono" element={ <Layout/>}/>
      
      
      <Route path="OpenClasses" element={ <OpenClassesLayout/> }>
            <Route index element={ <Navigate to="/OpenClasses/subjects" replace /> } />
            <Route path="subjects" element={ <Subjects/> }/>
            <Route path="classes" element={ <OpenClasses/> }/>
            <Route path="classHistory" element={ <ClassHistory/> }/>
      </Route>

      <Route path="Cons" element={ <ConsLayout/> }>
            <Route index element={ <Navigate to="/Cons/consMain" replace /> } />
            <Route path="consMain" element={ <ConsMain/> }/>
            <Route path="cons/:consCode" element={ <ConsDetail/> }/>
      </Route>

    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
