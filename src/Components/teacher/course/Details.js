/*
import React,{useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router";

const Details = (props)=>{
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
export default Details;*/
const Details = (props) => {
    console.log("props", props);
    if(props.course == null){
        return;
    }
    return(
        <div>
            <h1>{props.course.name}</h1>
            <p>Cena: {props.course.price}</p>
            <p>Kapacita: {props.course.limit}</p>
            <p>Popis: {props.course.description}</p>
        </div>
    )
}
export default Details