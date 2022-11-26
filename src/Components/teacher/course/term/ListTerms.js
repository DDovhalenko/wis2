

import react, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ListTerms = (props) => {
    const [addTermModalActive, setAddTermModalActive] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [terms, setTerms] = useState([]);

    const getTerms = async function() {
        const response = await axios.post("https://wis2back.herokuapp.com/showterms",
        {
            course:{
                id: props.id,
            }
        },
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        const data = response.data;
        console.log("fuck niggers", response);
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
        console.log("Sending request to delete term", props);
        const response = await axios.delete("https://wis2back.herokuapp.com/terms/"+props,
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true}
        )


    
    }


    const handleAddTerm = async function(e){
        e.preventDefault();
        console.log(e.target.termRoom.value.split(" ")[0]);
        
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
                        <th>Limit</th>
                    </tr>
                </thead>
                <tbody>
                    {props.terms && props.terms.map((term) => (
                        <tr key={term.id}>
                            <td>{term.term_type}</td>
                            <td>{term.date.substring(8,10)+"."+term.date.substring(5,7)+"."+term.date.substring(0,4)}</td>
                            <td>{term.time_start.substring(11,16)}</td>
                            <td>{term.time_end.substring(11,16)}</td>
                            <td>{term.limit}</td>
                            <td><button onClick={() => deleteTerm(term.id)}>Odstranit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Přidat termín</h2>
            {/*<CreateTerm course={props.course} modal={setAddTermModalActive}/>*/}
            <div>
            <form className="createTerm" onSubmit={handleAddTerm}>
            <input type="text" name="termType" placeholder="Typ termínu" required/>
                <input type="date" id="termDate" name="termDate" required></input>
                <input type="time" id="termTimeStart" name="termTimeStart" required></input>
                <input type="time" id="termTimeEnd" name="termTimeEnd" required></input>
                <input type="text" id="termLimit" name="termLimit" placeholder="limit" onKeyPress={e => onlyNumbers(e)}></input>
                <select name="termRoom" id="termRoom">
                    {rooms.map((room) => <option>{room.id} {room.name}</option>)}
                </select>
                <button type="submit">Přidat termín</button>
            </form>
        </div>
        </div>
    )
}

export default ListTerms


/*
            <button onClick={() => handleAddTerm()}>Přidat termín</button>

            <Modal active={addTermModalActive} setActive={setAddTermModalActive} activeOld={props.showTermsActive} setActiveOld={props.setShowTermsActive}>
                <CreateTerm course={props.course} modal={setAddTermModalActive}/>
            </Modal>
*/