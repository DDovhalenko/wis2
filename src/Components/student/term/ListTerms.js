//Author : Dmytro Dovhalenko xdovha00

import { useState, useEffect } from "react";
import axios from "axios";


const ListTerms = (props) => {
    const [error, setError] = useState(false);


    const registerTerm = async function(id){
        const response = await axios.post("https://wis2back.herokuapp.com/term_registrations",
        {
            term:{
                id: id,
            }
        },
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true}
        ).catch((error) => {
            setError(true);
        })
        .then((res)=>{
            if(res.data.message === "creating registration"){
                let arr = [...props.terms]
                arr.forEach((term)=>{
                    if(term.id === id){
                        
                        term.count++;
                        term.registered = true;
                    }
                })
                props.setTerms(arr);
            }
        })
    
    }

    return(
        <div className="Content">
            <table>
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Začátek</th>
                        <th>Konec</th>
                        <th>Kapacita</th>
                    </tr>
                </thead>
                <tbody>
                    {props.terms && props.terms.map((term) => (
                        <tr key={term.id}>
                            <td>{term.date.substring(8,10)+"."+term.date.substring(5,7)+"."+term.date.substring(0,4)}</td>
                            <td>{term.time_start.substring(11,16)}</td>
                            <td>{term.time_end.substring(11,16)}</td>
                            <td>{term.count}/{term.limit}</td>
                            <td>{term.registered?"Registered":""}</td>
                            <td><button disabled={term.registered} onClick={() => registerTerm(term.id)}>Přihlásit se</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {error && <h2 style={{"text-align": "center", "font-size":"xx-large", "color":"red"}}>Termín je již plný!</h2>}
        </div>
    )
}

export default ListTerms