import React from 'react';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Header from './Components/Header';
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import "./Styles/App.css"

const App =()=> {
  let state = {
      logged: false,
      loggedInStatus: "NOT_LOGGED_IN",
      user :{}
    };

  return(
    <div className = 'app'>
      <Header loggedInStatus = {state.loggedInStatus}></Header>
      <BrowserRouter>
        <Routes>
          <Route exact path={"/"} element={<Home user={state.user} loggedInStatus = {state.loggedInStatus} />}/>
          <Route exact path={"/dashboard"} element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App