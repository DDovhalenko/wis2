import React from "react";
import CreateCourse from "./CreateCourse";
import CourseList from "./CourseList";
import CourseDetails from "./CourseDetails";
import CreateTerm from "./CreateTerm";
import { useNavigate } from "react-router";
import TermList from "./TermList";


const CourseContent = (props)=>{
    const navigate = useNavigate();
    switch (props.active){
        case "1":
            //return(<Profile currUser={props.currUser} setCurrUser={props.setCurrUser}></Profile>);
            return(<CourseDetails></CourseDetails>);
        case "2":
            return(<TermList></TermList>);
        case "3":
            navigate("/teacher");
        default:
    }
}
export default CourseContent