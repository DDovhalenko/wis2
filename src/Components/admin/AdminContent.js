import React from "react";
import Profile from '../student/Profile';

const AdminContent = (props)=>{
    switch (props.active){
        case "1":
            return(<Profile currUser={props.currUser} setCurrUser={props.setCurrUser}></Profile>);
            //return(<div>aaa</div>);
        case "2":
            return(<div>Uživatelé</div>);
        case "3":
            return(<div>Místnosti</div>);
        case "4":
            return(<div>Statistiky</div>);
        case "5":
            return(<div>Odhlásit se</div>);
        default:
    }
}
export default AdminContent