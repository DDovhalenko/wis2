import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../modal/Modal";
import "../../styles.css"

const ListUsers = (props) => {

    const [users, setUsers] = useState([]);
    const [userRoleActive, setUserRoleActive] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState(null);

    const getUsers = async function() {
        const response = await axios.get("https://wis2back.herokuapp.com/users",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        const data = response.data;
        setUsers(data);
    }
    useEffect(() => {
        getUsers();
    }, [])

    const changeRoleClick = (props) => {
        setSelectedUser(props);
        setUserRoleActive(true);
    }

    const saveUserRole = async function(props){
        const response = await axios.put("https://wis2back.herokuapp.com/roleupdate",
        {
            user:{
                id: selectedUser.id,
                role: newRole
            }
        },
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true})

        getUsers();
        setUserRoleActive(false);
    }

    const onChangeRadioButton = (e) => {
        setNewRole(e.target.value);
    }

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Jméno</th>
                        <th>Příjmení</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td><button onClick={() => changeRoleClick(user)}>Změnit roli</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal active={userRoleActive} setActive={setUserRoleActive}>
                <h1>Změna role uživatele</h1>
                <div onChange={onChangeRadioButton}>
                    <label for="student">Student</label>
                    <input type="radio" id="student" name="role" value="student"/>
                    <br/>
                    <label for="teacher">Učitel</label>
                    <input type="radio" id="teacher" name="role" value="teacher"/>
                    <br/>
                    <label for="admin">Admin</label>
                    <input type="radio" id="admin" name="role" value="admin"/>
                </div>
                <button onClick={() => saveUserRole()}>Uložit</button>
            </Modal>
        </div>
    )
}
export default ListUsers