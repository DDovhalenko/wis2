import React,{useState} from 'react';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Header from './Components/Header';
import Home from "./Components/Home";
import Dashboard from "./Components/student/Dashboard";
import ProtectedRoute from './Components/auth/ProtectedRoute';
import "./Styles/App.css"

const App =()=> {

  const [currUser, setCurrUser]=useState(null);

  

  return(
    <div className = 'app'>
      <Header currUser={currUser}></Header>
      <BrowserRouter>
        <Routes>
          <Route exact path={"/"} element={<Home currUser={currUser} setCurrUser={setCurrUser} />}/>
          <Route element={<ProtectedRoute isAllowed={!!currUser&&currUser.role==="student"} />}>
            <Route exact path={"/dashboard"} element={<Dashboard setCurrUser={setCurrUser}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App