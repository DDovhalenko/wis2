import { useState, useEffect } from "react";
import axios from "axios";


const ListTerms = (props) => {
    const registerTerm = async function(props){
        const response = await axios.post("https://wis2back.herokuapp.com/term_registrations",
        {
            term:{
                id: props,
            }
        },
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true}
        )
    
    }

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Začátek</th>
                        <th>Konec</th>
                        <th>Limit</th>
                    </tr>
                </thead>
                <tbody>
                    {props.terms && props.terms.map((term) => (
                        <tr key={term.id}>
                            <td>{term.date.substring(8,10)+"."+term.date.substring(5,7)+"."+term.date.substring(0,4)}</td>
                            <td>{term.time_start.substring(11,16)}</td>
                            <td>{term.time_end.substring(11,16)}</td>
                            <td>{term.limit}</td>
                            <td><button onClick={() => registerTerm(term.id)}>Přihlásit se</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListTerms