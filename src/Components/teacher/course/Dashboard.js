import React,{useState} from 'react';
import axios from 'axios';
import Sidebar from '../../Sidebar';
import DashboardControl from './DashboardControl';

function CourseDashboard (props){
    const [active, setActive] = useState("");

    const handleClick = (event) => {
        setActive(event.target.id);
      }

    return( 
        <div className='content__wrapper'>
            <Sidebar>
                <button id={"1"} className={active==="1"?"open-btn active":"open-btn"}
                    onClick={(e)=>{handleClick(e);}}>Podrobnosti</button>
                <button id={"2"} className={active==="2"?"open-btn active":"open-btn"}
                    onClick={(e)=>{handleClick(e);}}>Termíny</button>
                <button id={"3"} className={active==="3"?"open-btn active":"open-btn"}
                    onClick={(e)=>{handleClick(e);}}>Zpět</button>
            </Sidebar>
            <div>
                <DashboardControl active={active} currUser={props.currUser} setCurrUser={props.setCurrUser}></DashboardControl>
            </div>
        </div>
    );
};
export default CourseDashboard;