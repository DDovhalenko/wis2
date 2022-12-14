//Author : Dmytro Dovhalenko xdovha00

import react, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../../modal/Modal';
import Details from './Details';

const ListCourses = () => {
    const [courses, setCourses] = useState([]);
    const [curCourse, setCurCourse] = useState(null);
    const [showDetailsActive, setShowDetailsActive] = useState(false);
    const [error, setError] = useState(null);

    const getCourses = async function(res) {
        const response = await axios.get("https://wis2back.herokuapp.com/courses",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        const data = response.data;
        data.forEach((course)=>{
            course.registered =false;
            res.forEach((rcourse)=>{
                if(rcourse.id === course.id){
                    course.registered = true;
                }
            })
        })
        setCourses(data);
    }
    const getRegisteredCourses = async function() {
        const response = await axios.get("https://wis2back.herokuapp.com/course_registrations",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        return response.data.courses
    }

    useEffect(() => {
        const func = async()=>{
            const res = await getRegisteredCourses();
            await getCourses(res);
        }
        func();
        
    }, [])

    

    const registerCourse = (props) => {  
        const id=props;      
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
        .then((props)=>{
            if(props.data.message === "creating registration"){
                let arr = [...courses]
                arr.forEach((course)=>{
                    if(course.id === id){
                        course.count++;
                        course.registered = true;
                    }
                })
                setCourses(arr);
            }
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
                            <td>{course.registered?"Registered":""}</td>
                            <td><button onClick={() => showDetails(course)}>Podrobnosti</button></td>
                            <td><button disabled={course.registered} onClick={() => registerCourse(course.id)}>Zaregistrovat</button></td>
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



    