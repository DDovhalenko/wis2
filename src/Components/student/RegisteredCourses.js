import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../../styles.css"

const RegisteredCourses = ()=>{
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    const unregisterCourse = async function(course) {
        console.log("missing unregister course request");
    }

    const getCourses = async function() {
        /*
        const response = await axios.get("https://wis2back.herokuapp.com/course_registrations",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        const data = response.data;
        console.log("ahoj", data);
        setCourses(data);*/
    }
    useEffect(() => {
        getCourses();
    }, [])


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
                            <td><button onClick={() => unregisterCourse(course)}>Odregistrovat</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default RegisteredCourses