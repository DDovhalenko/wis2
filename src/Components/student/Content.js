import React from "react";
import Profile from './Profile';
import Schedule from './Schedule';
import Study from './Study';


const Content = (props)=>{
    switch (props.active){
        case "1":
            return(<Profile currUser={props.currUser} setCurrUser={props.setCurrUser}></Profile>);
        case "2":
            return(<Study></Study>);
        case "3":
            return(<Schedule></Schedule>);
        default:
    }
}
export default Content