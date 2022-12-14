//Author : Dmytro Dovhalenko xdovha00

import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../../styles.css"
import Modal from "../modal/Modal";
import ListTerms from "./term/ListTerms";
import Details from "./course/Details";

const RegisteredCourses = ()=>{
    const navigate = useNavigate();
    const [terms, setTerms] = useState([]);
    const [courses, setCourses] = useState([]);
    const [showTermsActive, setShowTermsActive] = useState(false);
    const [showDetailsActive, setShowDetailsActive] = useState(false);
    const [curCourse, setCurCourse] = useState(null);
    const [termsFromSelectedCourse, setTermsFromSelectedCourse] = useState(null);


    const getTerms = async function() {
        const response = await axios.get("https://wis2back.herokuapp.com/term_registrations",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        setTerms(response.data.terms);
    }

    const unregisterCourse = async function(props) {
        const response = await axios.post("https://wis2back.herokuapp.com/delete_course_registrations",
        {
            course:{
                id: props
            }
        },
        {headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        getCourses();
        
    }

    const getCourses = async function() {
        const response = await axios.get("https://wis2back.herokuapp.com/course_registrations",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        setCourses(response.data.courses);
    }
    useEffect(() => {
        getCourses();
        getTerms();
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
        data.forEach((term)=>{
            term.registered =false;
            terms.forEach((rterm)=>{
                if(rterm.id === term.id){
                    term.registered = true;
                }
            })
        })
        setTermsFromSelectedCourse(data);
        setShowTermsActive(true);
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
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.name}</td>
                            <td>{course.price}</td>
                            <td><button onClick={() => showDetails(course)}>Podrobnosti</button></td>
                            <td><button onClick={() => showTerms(course.id)}>Termíny</button></td>
                            <td><button onClick={() => unregisterCourse(course.id)}>Odregistrovat</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal active={showTermsActive} setActive={setShowTermsActive}>
                <ListTerms terms={termsFromSelectedCourse} setTerms={setTermsFromSelectedCourse}></ListTerms>
            </Modal>
            <Modal active={showDetailsActive} setActive={setShowDetailsActive}>
                <Details course={curCourse}></Details>
            </Modal>
        </div>
    )
}
export default RegisteredCourses