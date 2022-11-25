import React,{useState, useEffect} from "react";
import axios from 'axios';
//import "../../../Styles/teacher/CreateTerm.css"
import { useParams } from "react-router";

const CreateTerm = (props) => {
    const {id} = useParams();
    const cleanId = id.replace(":", "");
    const [rooms, setRooms] = useState([]);

    const getRooms = async function() {
        const response = await axios.get("https://wis2back.herokuapp.com/rooms",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        const data = response.data;
        setRooms([])
        for(let i=0;i<data.length;i++){
            setRooms(rooms => [...rooms, data[i].name]);
        }


    }
    useEffect(() => {
        getRooms();
    }, [])


    const handleSubmit = async function(e){
        e.preventDefault();


        console.log("Sent request to create term");
        const resp = await axios.post("https://wis2back.herokuapp.com/terms",
        {
            course:{
                id: cleanId,
            },
            term:{
                term_type: e.target.termType.value,
                date: e.target.termDate.value,
                time_start: e.target.termTimeStart.value,
                time_end: e.target.termTimeEnd.value,
                limit: e.target.termLimit.value,
            },
            room:{
                name:e.target.termRoom.value
            }
        },
        {
            headers:{'authorization': localStorage.getItem("token")},
            withCredentials:true
        }
        )
        console.log("Response from create term", resp);
        /*
        axios.post("https://wis2back.herokuapp.com/rooms",
        {
            room:{
                name: "D105"
            }
        },
        {
            headers:{'authorization': localStorage.getItem("token")},
            withCredentials:true
        }
        )*/
        //const a = await axios.get("https://wis2back.herokuapp.com/rooms",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        //console.log(a);


    }

    const onlyNumbers = (e)=>{
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
    }

    return(
        <div className="createTerm">
            <form className="createTerm" onSubmit={handleSubmit}>
                <input type="text" name="termType" placeholder="Typ termínu" required/>
                <input type="date" id="termDate" name="termDate" required></input>
                <input type="time" id="termTimeStart" name="termTimeStart" required></input>
                <input type="time" id="termTimeEnd" name="termTimeEnd" required></input>
                <input type="text" id="termLimit" name="termLimit" placeholder="limit" onKeyPress={e => onlyNumbers(e)}></input>
                <select name="termRoom" id="termRoom">
                    {rooms.map((room) => <option>{room}</option>)}
                </select>
                <button type="submit">Vytvořit termín</button>
            </form>
        </div>
    )
}

export default CreateTerm;