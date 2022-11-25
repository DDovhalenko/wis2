import React,{useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router";

const CourseDetails = (props)=>{
    const [course, setCourse] = useState([]);
    const {id} = useParams();
    const clearId = id.replace(":", "");
    useEffect(() => {
        const getCourses = async function() {
            const response = await axios.get("https://wis2back.herokuapp.com/courses",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
            const data = response.data;
            //const kokot = data.find(a=>{return a.id==clearId})
            setCourse(data.find(data=>data.id==clearId));
            //const kokot = data[clearId];
            //setCourse(data[{id}]);
            //console.log(clearId, kokot)
        }
        getCourses();
    }, [])

    return(
        <div>
            <h1>{course.name}</h1>
            <p>{course.description}</p>
        </div>
    )

}
export default CourseDetails;