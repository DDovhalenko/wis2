import React,{useState, useEffect} from "react";
import axios from "axios";



const Schedule = ()=>{
    const [terms, setTerms] = useState([]);

    const getTerms = async function() {
        const response = await axios.get("https://wis2back.herokuapp.com/term_registrations",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        setTerms(response.data.terms);
    }

    useEffect(() => {
        getTerms();
    }, [])

    const unregisterTerm = async function(props){
        const response = await axios.post("https://wis2back.herokuapp.com/delete_term_registrations",
        {
            term:{
                id: props,
            }
        },
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        getTerms();
        
    }

    return(
    <div>
        <table>
            <thead>
                <tr>
                    <th>Předmět</th>
                    <th>Datum</th>
                    <th>Začátek</th>
                    <th>Konec</th>
                </tr>
            </thead>
            <tbody>
                {terms && terms.map((term) => (
                    <tr key={term.id}>
                        <td>{term.name}</td>
                        <td>{term.date.substring(8,10)+"."+term.date.substring(5,7)+"."+term.date.substring(0,4)}</td>
                        <td>{term.time_start.substring(11,16)}</td>
                        <td>{term.time_end.substring(11,16)}</td>
                        <td><button onClick={() => unregisterTerm(term.id)}>Odhlásit se</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )

}
export default Schedule