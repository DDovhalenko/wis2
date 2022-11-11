import React from "react";
import "../Styles/Header.css"

const Header = (props)=>{
    return(
    <header className="header">
        <h1>Status: {props.currUser?props.currUser.email:"NotLoggedIn"}</h1>
    </header>
    );
}
export default Header