//Author : Dmytro Dovhalenko xdovha00

import React from "react";
import Profile from '../Profile';
import ListCourses from "./course/ListCourses";
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
        case "4":
            //registrace kurzů
            return(<ListCourses></ListCourses>)
        default:
    }
}
export default DashboardControl