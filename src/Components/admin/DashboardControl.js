import React from "react";
import Profile from '../Profile';
import ListCourses from "./course/ListCourses";
import ListRooms from "./rooms/ListRooms";
import ListUsers from "./Users/ListUsers";
import Statistics from "./Statistics";

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