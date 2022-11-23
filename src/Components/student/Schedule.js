import React,{useState, useEffect} from "react";
import axios from "axios";



const Schedule = ()=>{
    const [terms, setTerms] = useState([]);

    const getCourses = async function() {
        /*
        const response = await axios.post("https://wis2back.herokuapp.com/showterms",
        {
            course:{
                id: cleanId,
            }
        },
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        const data = response.data;
        console.log("term list kokot", response);
        setTerms(data);*/
    }

    useEffect(() => {
        getCourses();
    }, [])

    const deleteTerm = (props) =>{
    
    }

    return(
    <div>
        <table>
            <thead>
                <tr>
                    <th>Datum</th>
                    <th>Začátek</th>
                    <th>Konec</th>
                </tr>
            </thead>
            <tbody>
                {terms && terms.map((term) => (
                    <tr key={term.id}>
                        <td>{term.date.substring(8,10)+"."+term.date.substring(5,7)+"."+term.date.substring(0,4)}</td>
                        <td>{term.time_start.substring(11,16)}</td>
                        <td>{term.time_end.substring(11,16)}</td>
                        <td><button onClick={() => deleteTerm(term.id)}>Odhlásit se</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )

}
export default Schedule