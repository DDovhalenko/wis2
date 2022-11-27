

import react, {useState, useEffect} from 'react';
import axios from 'axios';
import "../../../../styles.css"


const ListTerms = (props) => {
    const [addTermModalActive, setAddTermModalActive] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [terms, setTerms] = useState([]);
    const [error, setError] = useState(false);

    const getTerms = async function() {
        if(props.course == null){
            return;
        }
        const response = await axios.post("https://wis2back.herokuapp.com/showterms",
        {
            course:{
                id: props.course.id,
            }
        },
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        const data = response.data;
        setTerms(data);

    }


    const getRooms = async function() {
        const response = await axios.get("https://wis2back.herokuapp.com/rooms",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        const data = response.data;
        setRooms([])
        for(let i=0;i<data.length;i++){
            setRooms(rooms => [...rooms, data[i]]);
        }


    }
    useEffect(() => {
        getTerms();
        getRooms();
    }, [])

    const deleteTerm = async function(props){
        const response = await axios.delete("https://wis2back.herokuapp.com/terms/"+props,
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true}
        )
        getTerms();
    }


    const handleAddTerm = async function(e){
        e.preventDefault();        
        const resp = await axios.post("https://wis2back.herokuapp.com/terms",
        {
            course:{
                id: props.course.id
            },
            term:{
                term_type: e.target.termType.value,
                date: e.target.termDate.value,
                time_start: e.target.termTimeStart.value,
                time_end: e.target.termTimeEnd.value,
                limit: e.target.termLimit.value,
            },
            room:{
                id: e.target.termRoom.value.split(" ")[0]
            }
        },
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        .catch(error => {
            setError(true);
        })
        getTerms();
    
    }

    const onlyNumbers = (e)=>{
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
    }

    return(
        <div>
            <h2>Aktuální termíny</h2>
            <table>
                <thead>
                    <tr>
                        <th>Typ</th>
                        <th>Datum</th>
                        <th>Začátek</th>
                        <th>Konec</th>
                        <th>Kapacita</th>
                        <th>Místnost</th>
                    </tr>
                </thead>
                <tbody>
                    {terms && terms.map((term) => (
                        <tr key={term.id}>
                            <td>{term.term_type}</td>
                            <td>{term.date.substring(8,10)+"."+term.date.substring(5,7)+"."+term.date.substring(0,4)}</td>
                            <td>{term.time_start.substring(11,16)}</td>
                            <td>{term.time_end.substring(11,16)}</td>
                            <td>{term.count}/{term.limit}</td>
                            <td><button onClick={() => deleteTerm(term.id)}>Odstranit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Přidat termín</h2>
            <div>
            <form className="createTerm" onSubmit={handleAddTerm}>
                <label>Typ termínu</label>
                <input type="text" name="termType" placeholder="Typ termínu" required/>
                <label>Datum</label>
                <input type="date" id="termDate" name="termDate" required></input>
                <label>Od</label>
                <input type="time" id="termTimeStart" name="termTimeStart" required></input>
                <label>Do</label>
                <input type="time" id="termTimeEnd" name="termTimeEnd" required></input>
                <label>Kapacita</label>
                <input type="text" id="termLimit" name="termLimit" placeholder="kapacita" onKeyPress={e => onlyNumbers(e)} required></input>
                <label>Místnost</label>
                <select name="termRoom" id="termRoom">
                    {rooms.map((room) => <option>{room.id} {room.name}</option>)}
                </select>
                <button type="submit">Přidat termín</button>
            </form>
            </div>
            {error && <h2 style={{"text-align": "center", "font-size":"xx-large", "color":"red"}}>V zadaném čase je už tato místnost obsazená!</h2>}
        </div>
    )
}

export default ListTerms
