import react, {useState, useEffect} from "react";
import axios from "axios";



const ListRooms = () => {
    
    
    
    const [rooms, setRooms] = useState([]);

    const getRooms = async function() {
        const response = await axios.get("https://wis2back.herokuapp.com/rooms",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        const data = response.data;
        setRooms(data)
    }
    useEffect(() => {
        getRooms();
    }, [])

    const deleteRoom = async function(props){
        const response = await axios.delete("https://wis2back.herokuapp.com/rooms/"+props,
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true}
        )
        getRooms();
    }

    const addRoom = async function(e){
        e.preventDefault();
        const resp = await axios.post("https://wis2back.herokuapp.com/rooms",
        {
            name: e.target.roomName.value,
        },
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true}
        )
        getRooms();
    }
    
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>název</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.name}</td>
                            <td><button onClick={() => deleteRoom(room.id)}>Smazat</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Přidat místnost</h2>
            <form onSubmit={addRoom}>
                <input type="text" name="roomName" placeholder="Název místnosti"></input>
                <button type="submit">Přidat místnost</button>
            </form>
        </div>
    )
}
export default ListRooms
