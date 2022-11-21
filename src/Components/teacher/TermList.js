import react, {useState, useEffect} from 'react';
import {BrowserRouter,Routes, Route, useNavigate} from "react-router-dom";
import axios from 'axios';
import Modal from '../modal/Modal';
import CreateTerm from './CreateTerm';


const TermList =()=> {


    const navigate = useNavigate();
    const [terms, setTerms] = useState([]);

    const [addTermModalActive, setAddTermModalActive] = useState(false);

    useEffect(() => {
        const getCourses = async function() {
            const response = await axios.get("https://wis2back.herokuapp.com/terms",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
            const data = response.data;
            console.log("kokot", response);
            setTerms(data);
        }
        getCourses();
    }, [])

    return (
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
                            <td>{term.date}</td>
                            <td>{term.time_start}</td>
                            <td>{term.time_end}</td>
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

}
export default TermList