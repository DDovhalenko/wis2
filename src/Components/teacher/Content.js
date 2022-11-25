import React from "react";
import Profile from '../student/Profile';
import CreateCourse from "./CreateCourse";
import CourseList from "./CourseList";

const Content = (props)=>{
    switch (props.active){
        case "1":
            return(<Profile currUser={props.currUser} setCurrUser={props.setCurrUser}></Profile>);
            //return(<div>aaa</div>);
        case "2":
            return(<CreateCourse></CreateCourse>);
        case "3":
            return(<CourseList></CourseList>);
        case "4":
            return(<div>Odhlásit se</div>);
        default:
    }
}
export default Content