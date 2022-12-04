import react, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../../modal/Modal';
import Details from './Details';

const ListCourses = () => {
    const [courses, setCourses] = useState([]);
    const [curCourse, setCurCourse] = useState(null);
    const [showDetailsActive, setShowDetailsActive] = useState(false);
    const [error, setError] = useState(null);

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
        .catch((error) => {
            setError(true);
        })
    }

    const showDetails = (props) => {
        setCurCourse(props);
        setShowDetailsActive(true);
    }


    return (
        <div className='Content'>
            <table>
                <thead>
                    <tr>
                        <th>Název</th>
                        <th>Cena</th>
                        <th>Kapacita</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.name}</td>
                            <td>{course.price}</td>
                            <td>{course.count}/{course.limit}</td>
                            <td><button onClick={() => showDetails(course)}>Podrobnosti</button></td>
                            <td><button onClick={() => registerCourse(course.id)}>Zaregistrovat</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal active={showDetailsActive} setActive={setShowDetailsActive}>
                <Details course={curCourse}></Details>
            </Modal>
            {error && <h1 style={{"text-align": "center", "font-size":"xx-large", "color":"red"}}>Tento kurz je již plný!</h1>}
        </div>
    )

}
export default ListCourses



    