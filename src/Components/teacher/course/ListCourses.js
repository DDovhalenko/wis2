import react, { useEffect, useState} from 'react';
//import "../../Styles/teacher/teacher.css"
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import UpdateCourse from './UpdateCourse';
import Modal from '../../modal/Modal';


const ListCourses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [updateCourseActive, setUpdateCourseModalActive] = useState(false);
    const [curCourse, setCurCourse] = useState(null);

    const getCourses = async function() {
        const response = await axios.get("https://wis2back.herokuapp.com/courses",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        const data = response.data;
        console.log("ahoj", data);
        setCourses(data);
    }
    useEffect(() => {
        getCourses();
    }, [])

    const updateCourse = (props) => {
        setCurCourse(props)
        setUpdateCourseModalActive(true)
    }


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Název</th>
                        <th>Cena</th>
                        <th>Limit</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.name}</td>
                            <td>{course.price}</td>
                            <td>{course.limit}</td>
                            <td><button onClick={() => navigate("/teacher/course:"+course.id)}>Podrobnosti</button></td>
                            <td><button onClick={() => updateCourse(course)}>Upravit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal active={updateCourseActive} setActive={setUpdateCourseModalActive}>
                <UpdateCourse course = {curCourse} update={getCourses} setModalActive={setUpdateCourseModalActive}/>
            </Modal>
        </div>
    )



}

export default ListCourses

/*

                            */
