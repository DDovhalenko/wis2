import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../../styles.css"
import Modal from "../modal/Modal";
import ListTerms from "./term/ListTerms";
import Details from "./course/Details";

const RegisteredCourses = ()=>{
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [showTermsActive, setShowTermsActive] = useState(false);
    const [showDetailsActive, setShowDetailsActive] = useState(false);
    const [curCourse, setCurCourse] = useState(null);
    const [termsFromSelectedCourse, setTermsFromSelectedCourse] = useState(null);


    const unregisterCourse = async function(props) {
        console.log("Sending request to unregister user from course", props);
        const response = await axios.post("https://wis2back.herokuapp.com/delete_course_registrations",
        {
            course:{
                id: props
            }
        },
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        console.log("Response from unregister user from course", response);
        getCourses();
        
    }

    const getCourses = async function() {
        console.log("Sending request to get registered courses");
        const response = await axios.get("https://wis2back.herokuapp.com/course_registrations",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        console.log("Response from get registered courses", response);
        setCourses(response.data.courses);
    }
    useEffect(() => {
        getCourses();
    }, [])

    const showTerms = async function(props){
        const response = await axios.post("https://wis2back.herokuapp.com/showterms",
        {
            course:{
                id: props,
            }
        },
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        const data = response.data;
        console.log("term list kokot", response);
        setTermsFromSelectedCourse(data);

        setShowTermsActive(true);
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
                            <td><button onClick={() => showTerms(course.id)}>Termíny</button></td>
                            <td><button onClick={() => unregisterCourse(course.id)}>Odregistrovat</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal active={showTermsActive} setActive={setShowTermsActive}>
                <ListTerms terms={termsFromSelectedCourse}></ListTerms>
            </Modal>
            <Modal active={showDetailsActive} setActive={setShowDetailsActive}>
                <Details course={curCourse}></Details>
            </Modal>
        </div>
    )
}
export default RegisteredCourses