//Author : Dmytro Dovhalenko xdovha00

import React from "react";
import "../Styles/Header.css"

const Header = (props)=>{
    return(
    <header className="header">
        {<h1>{props.currUser?"Momentálně přihlášen: "+props.currUser.name+" "+props.currUser.surname:"Nepřihlašený uživatel"}</h1>}
    </header>
    );
}
export default Header