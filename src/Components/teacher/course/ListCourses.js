import react, { useEffect, useState} from 'react';
//import "../../Styles/teacher/teacher.css"
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import UpdateCourse from './UpdateCourse';
import Modal from '../../modal/Modal';
import Details from './Details';
import ListTerms from './term/ListTerms';
import "../../../styles.css"

const ListCourses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [updateCourseActive, setUpdateCourseModalActive] = useState(false);
    const [curCourse, setCurCourse] = useState(null);
    const [showDetailsActive, setShowDetailsActive] = useState(false);
    const [termsFromSelectedCourse, setTermsFromSelectedCourse] = useState(null);
    const [showTermsActive, setShowTermsActive] = useState(false);


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

    const showDetails = (props) => {
        setCurCourse(props);
        setShowDetailsActive(true);
    }

    const showTerms = async function(props){
        const response = await axios.post("https://wis2back.herokuapp.com/showterms",
        {
            course:{
                id: props.id,
            }
        },
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        const data = response.data;
        console.log("term list kokot", response);
        setCurCourse(props);
        setTermsFromSelectedCourse(data);
        setShowTermsActive(true);
    }

    const deleteCourse = async function(props){
        const response = await axios.delete("https://wis2back.herokuapp.com/courses/"+props,
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        getCourses();
    }


    return (
        <div>
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
                            <td><button onClick={() => showTerms(course)}>Termíny</button></td>
                            <td><button onClick={() => updateCourse(course)}>Upravit</button></td>
                            <td><button onClick={() => deleteCourse(course.id)}>Smazat</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal active={updateCourseActive} setActive={setUpdateCourseModalActive}>
                <UpdateCourse course = {curCourse} update={getCourses} setModalActive={setUpdateCourseModalActive}/>
            </Modal>
            <Modal active={showDetailsActive} setActive={setShowDetailsActive}>
                <Details course={curCourse}></Details>
            </Modal>
            <Modal active={showTermsActive} setActive={setShowTermsActive}>
                <ListTerms terms={termsFromSelectedCourse} course={curCourse} active={showTermsActive} setActive={setShowTermsActive}></ListTerms>
            </Modal>
        </div>
    )



}

export default ListCourses

/*

                            */
