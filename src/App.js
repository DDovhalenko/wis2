import React,{useState} from 'react';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Header from './Components/Header';
import Home from "./Components/Home";
import Dashboard from "./Components/student/Dashboard";
import ProtectedRoute from './Components/auth/ProtectedRoute';
import "./Styles/App.css"
import TeacherDashboard from './Components/teacher/TeacherDashboard';
import CourseDetails from './Components/teacher/CourseDetails';
import CourseDashboard from './Components/teacher/CourseDashboard';

const App =()=> {

  const [currUser, setCurrUser]=useState(null);

  

  return(
    <div className = 'app'>
      <Header currUser={currUser}></Header>
      <BrowserRouter>
        <Routes>
          <Route exact path={"/"} element={<Home currUser={currUser} setCurrUser={setCurrUser} />}/>
          <Route element={<ProtectedRoute isAllowed={!!currUser&&currUser.role==="student"} />}>
            <Route exact path={"/dashboard"} element={<Dashboard currUser={currUser} setCurrUser={setCurrUser}/>}/>
          </Route>
          <Route exact path="/teacher" element={<TeacherDashboard/>}/>
          <Route path="teacher/course:id" element={<CourseDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App