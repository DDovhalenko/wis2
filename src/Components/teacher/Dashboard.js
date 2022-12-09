//Author : Roman Vintoňak xvinto00

import React,{useState} from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router';
import DashboardControl from './DashboardControl';

function Dashboard (props){
    const [active, setActive] = useState("");
    const navigate = useNavigate();

    const handleClick = (event) => {
        setActive(event.target.id);
      }

    const handleLogOut = ()=>{
        console.log("logout");
        axios.delete("https://wis2back.herokuapp.com/logout",
            {             
            },
            {headers: {
                "authorization": localStorage.getItem("token")
                },
                withCredentials:true}
            )
            .then(response=>{
                console.log("logout", response);
                if(response.status===200){
                    localStorage.removeItem("token");
                }
            })
            .catch(error=>{
                console.log("logout error", error);
        })

        navigate("/")
    }
    
    return( 
        <div className='content__wrapper'>
            <Sidebar>
                <button id={"1"} className={active==="1"?"open-btn active":"open-btn"}
                    onClick={(e)=>{handleClick(e);}}>Upravit profil</button>
                <button id={"2"} className={active==="2"?"open-btn active":"open-btn"}
                    onClick={(e)=>{handleClick(e);}}>Založit kurz</button>
                <button id={"3"} className={active==="3"?"open-btn active":"open-btn"}
                    onClick={(e)=>{handleClick(e);}}>Seznam kurzů</button>
                <button id={"4"} className={active==="4"?"open-btn active":"open-btn"}
                    onClick={(e)=>{handleClick(e);handleLogOut();}}>Odhlásit se</button>
            </Sidebar>
            <div>
                <DashboardControl active={active} currUser={props.currUser} setCurrUser={props.setCurrUser}></DashboardControl>
            </div>
        </div>
    );
};
export default Dashboard;