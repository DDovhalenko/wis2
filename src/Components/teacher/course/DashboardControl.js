import React from "react";
import { useNavigate } from "react-router";
import Details from "./Details";
import ListTerms from "./term/ListTerms";


const DashboardControl = (props)=>{
    const navigate = useNavigate();
    switch (props.active){
        case "1":
            //info o kurzu
            return(<Details></Details>);
        case "2":
            //seznam termínů
            return(<ListTerms></ListTerms>);
        case "3":
            navigate("/teacher");
        default:
    }
}
export default DashboardControl