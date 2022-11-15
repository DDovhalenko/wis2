import React from "react";
import "../Styles/Sidebar.css"

const Sidebar = ({children})=>{
    return(
    <div className="sidebar">
        <div className="sidebar__content">
        {children}
        </div>
    </div>
    );
}
export default Sidebar