import react, { useEffect, useState} from 'react';
import "../../Styles/teacher/teacher.css"
import axios from 'axios';
import CourseDetails from './CourseDetails';
import {BrowserRouter,Routes, Route, withRouter, useNavigate, Navigate} from "react-router-dom";


const CourseList = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourses = async function() {
            const response = await axios.get("https://wis2back.herokuapp.com/courses",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
            const data = response.data;
            console.log("ahoj", data);
            setCourses(data);
        }
        getCourses();
    }, [])

    const showDetails = (id) => {
        console.log("kokot", id);
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )



}

export default CourseList