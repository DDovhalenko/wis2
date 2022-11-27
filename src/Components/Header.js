import React from "react";
import "../Styles/Header.css"

const Header = (props)=>{
    return(
    <header className="header">
        <h1>Momentálně přihlášen: {props.currUser?props.currUser.name+" "+props.currUser.surname:"NotLoggedIn"}</h1>
    </header>
    );
}
export default Header