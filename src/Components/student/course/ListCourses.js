import react, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../../modal/Modal';
import Details from './Details';

const ListCourses = () => {
    const [courses, setCourses] = useState([]);
    const [curCourse, setCurCourse] = useState(null);
    const [showDetailsActive, setShowDetailsActive] = useState(false);


    const getCourses = async function() {
        const response = await axios.get("https://wis2back.herokuapp.com/courses",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        const data = response.data;
        setCourses(data);
    }
    useEffect(() => {
        getCourses();
    }, [])

    const registerCourse = (props) => {        
        const response = axios.post("https://wis2back.herokuapp.com/course_registrations",
        {
            course:{
                id: props
            }
        },
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
    }

    const showDetails = (props) => {
        setCurCourse(props);
        setShowDetailsActive(true);
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
                            <td><button onClick={() => showDetails(course)}>Podrobnosti</button></td>
                            <td><button onClick={() => registerCourse(course.id)}>Zaregistrovat</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal active={showDetailsActive} setActive={setShowDetailsActive}>
                <Details course={curCourse}></Details>
            </Modal>
        </div>
    )

}
export default ListCourses



    