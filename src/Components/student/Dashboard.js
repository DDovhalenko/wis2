import React,{useState} from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import Content from './Content'

function Dashboard (props){
    const [active, setActive] = useState("");

    const handleClick = (event) => {
        setActive(event.target.id);
      }
    const handleLogOut = ()=>{
        console.log("logout");
        axios.delete("http://localhost:3001/logout",
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

    }
    return( 
        <div className='content__wrapper'>
            <Sidebar>
                <button id={"1"} className={active==="1"?"open-btn active":"open-btn"}
                    onClick={(e)=>{handleClick(e);}}>Upravit profil</button>
                <button id={"2"} className={active==="2"?"open-btn active":"open-btn"}
                    onClick={(e)=>{handleClick(e);}}>Přehled studia</button>
                <button id={"3"} className={active==="3"?"open-btn active":"open-btn"}
                    onClick={(e)=>{handleClick(e);}}>Rozvrh</button>
                <button id={"4"} className={active==="4"?"open-btn active":"open-btn"}
                    onClick={(e)=>{handleClick(e);}}>Registrace kurzů</button>
                <button id={"5"} className={active==="5"?"open-btn active":"open-btn"}
                    onClick={(e)=>{handleClick(e);}}>Registrace terminu</button>
                <button id={"6"} className={active==="6"?"open-btn active":"open-btn"}
                    onClick={(e)=>{handleClick(e);handleLogOut();}}>Odhlásit se</button>
            </Sidebar>
            <div>
                <h1>Dashboard</h1>
                <Content active={active} currUser={props.currUser} setCurrUser={props.setCurrUser}></Content>
            </div>
        </div>
    );
};
export default Dashboard;