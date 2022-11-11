import React from 'react';
import axios from 'axios';

function Dashboard (props){
    const handleLogOut = ()=>{
        console.log("logout");
        axios.delete("http://localhost:3001/logout",
            {
                headers: {
                    "authorization": localStorage.getItem("token")
                    }
                
            },
            {withCredentials:true}
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
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    );
};
export default Dashboard;