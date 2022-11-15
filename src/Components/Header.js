import React from "react";
import "../Styles/Header.css"

const Header = (props)=>{
    return(
    <header className="header">
        <h1>Status: {props.currUser?props.currUser.name+" "+props.currUser.surname:"NotLoggedIn"}</h1>
    </header>
    );
}
export default Header