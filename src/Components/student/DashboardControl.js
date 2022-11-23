import React from "react";
import Profile from '../Profile';
import RegisteredCourses from "./RegisteredCourses";
import Schedule from "./Schedule";


const DashboardControl = (props)=>{
    switch (props.active){
        case "1":
            //profil
            return(<Profile currUser={props.currUser} setCurrUser={props.setCurrUser}></Profile>);
        case "2":
            //seznám přihlášených kurzů
            return(<RegisteredCourses></RegisteredCourses>);
        case "3":
            //seznam přihlášených termínů
            return(<Schedule></Schedule>);
        default:
    }
}
export default DashboardControl