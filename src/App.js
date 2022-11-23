import React,{useState} from 'react';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Header from './Components/Header';
import Home from "./Components/Home";
import ProtectedRoute from './Components/auth/ProtectedRoute';
import "./Styles/App.css"
import TeacherDashboard from './Components/teacher/Dashboard';
import StudentDashboard from './Components/student/Dashboard';
import AdminDashboard from './Components/admin/Dashboard';
import CourseDashboard from './Components/teacher/course/Dashboard';

const App =()=> {

  const [currUser, setCurrUser]=useState(null);

  

  return(
    <div className = 'app'>
      <Header currUser={currUser}></Header>
      <BrowserRouter>
        <Routes>
          <Route exact path={"/"} element={<Home currUser={currUser} setCurrUser={setCurrUser} />}/>
          <Route element={<ProtectedRoute isAllowed={!!currUser&&currUser.role==="student"} />}>
            <Route exact path={"/student"} element={<StudentDashboard currUser={currUser} setCurrUser={setCurrUser}/>}/>
          </Route>
          <Route element={<ProtectedRoute isAllowed={!!currUser&&currUser.role==="teacher"} />}>
            <Route exact path={"/teacher"} element={<TeacherDashboard currUser={currUser} setCurrUser={setCurrUser}/>}/>
          </Route>
          <Route element={<ProtectedRoute isAllowed={!!currUser&&currUser.role==="admin"} />}>
            <Route exact path={"/admin"} element={<AdminDashboard currUser={currUser} setCurrUser={setCurrUser}/>}/>
          </Route>
          <Route path="teacher/course:id" element={<CourseDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App

/*
          <Route exact path="/teacher" element={<TeacherDashboard/>}/>




 */