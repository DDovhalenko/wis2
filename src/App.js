import React,{useState} from 'react';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Header from './Components/Header';
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import "./Styles/App.css"

const App =()=> {

  const [currUser, setCurrUser]=useState(null);

  

  return(
    <div className = 'app'>
      <Header currUser={currUser}></Header>
      <BrowserRouter>
        <Routes>
          <Route exact path={"/"} element={<Home currUser={currUser} setCurrUser={setCurrUser} />}/>
          <Route exact path={"/dashboard"} element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App