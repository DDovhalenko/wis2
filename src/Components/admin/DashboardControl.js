//Author : Ivo Prochazka xproch0h

import React from "react";
import Profile from '../Profile';
import ListRooms from "./ListRooms";
import ListUsers from "./ListUsers";
import ListCourses from "../teacher/course/ListCourses";

const DashboardControl = (props)=>{
    switch (props.active){
        case "1":
            //profil
            return(<Profile currUser={props.currUser} setCurrUser={props.setCurrUser}></Profile>);
        case "2":
            //přehled uživatelů
            return(<ListUsers></ListUsers>);
        case "3":
            //přehled místností
            return(<ListRooms></ListRooms>);
        case "4":
            //přehled kurzů
            return(<ListCourses></ListCourses>);
        default:
    }
}
export default DashboardControl