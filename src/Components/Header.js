import React from "react";
import "../Styles/Header.css"

const Header = (props)=>{
    return(
    <header className="header">
        <h1>Status: {props.loggedInStatus}</h1>
    </header>
    );
}
export default Header