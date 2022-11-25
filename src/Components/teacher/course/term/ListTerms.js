

import react, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from '../../../modal/Modal';
import CreateTerm from './CreateTerm';
import { useParams } from 'react-router-dom';
/*
const ListTerms =()=> {
    const {id} = useParams();
    const cleanId = id.replace(":", "");

    //const navigate = useNavigate();
    const [terms, setTerms] = useState([]);
    const [addTermModalActive, setAddTermModalActive] = useState(false);

    const getCourses = async function() {
        const response = await axios.post("https://wis2back.herokuapp.com/showterms",
        {
            course:{
                id: cleanId,
            }
        },
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        const data = response.data;
        console.log("term list kokot", response);
        setTerms(data);
    }

    useEffect(() => {
        getCourses();
    }, [])


    const deleteTerm = (props) =>{
        console.log("Missing delete request");
        const response = axios.delete("https://wis2back.herokuapp.com/terms/"+props)
        getCourses();
        
        const response = await axios.delete("https://wis2back.herokuapp.com/terms/"+id,
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true})

        const data = response.data;
        console.log("ahoj", data);
        setTe
        
    }

    return (
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
                    {terms && terms.map((term) => (
                        <tr key={term.id}>
                            <td>{term.date.substring(8,10)+"."+term.date.substring(5,7)+"."+term.date.substring(0,4)}</td>
                            <td>{term.time_start.substring(11,16)}</td>
                            <td>{term.time_end.substring(11,16)}</td>
                            <td>{term.limit}</td>
                            <td><button onClick={() => deleteTerm(term.id)}>Smazat</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => setAddTermModalActive(true)}>Přidat termín</button>
            <Modal active={addTermModalActive} setActive={setAddTermModalActive}>
                <CreateTerm/>
            </Modal>
        </div>
    )

}*/

const ListTerms = (props) => {
    const deleteTerm = async function(props){
        console.log("Sending request to delete term", props);
        const response = await axios.delete("https://wis2back.herokuapp.com/terms/"+props,
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
                            <td><button onClick={() => deleteTerm(term.id)}>Odstranit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListTerms