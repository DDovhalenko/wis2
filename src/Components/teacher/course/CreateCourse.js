//Author : Roman Vintoňak xvinto00

import React,{useState, useEffect} from "react";
import axios from 'axios';
import "../../../styles.css"
import "../../../Styles/teacher/CreateCourse.css"

const CreateCourse = (props)=>{
    const [submited, setSubmited] = useState(false)

    const handleSubmit = async function(e){
        e.preventDefault();

        setSubmited(true)

        await axios.post("https://wis2back.herokuapp.com/courses",
        {
            course:{
                name: e.target.courseName.value,
                full_name:"Iis",
                description: e.target.courseDescription.value,
                course_type:"typ",
                price: e.target.coursePrice.value,
                limit: e.target.courseLimit.value,
            }
        },
        {
            headers:{'authorization': localStorage.getItem("token")},
            withCredentials:true
        }
        )
        .then(response=>{
            console.log("response", response);
        })
        .catch(error=>{
            console.log("error", error);
        })
        
        //e.target.reset();
    }

    const onlyNumbers = (e)=>{
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
    }

    return(
        <div className="createCourse">
            <form className="createCourseForm" onSubmit={handleSubmit}>
                <label htmlFor="courseName">Název kurzu *</label>
                <input type="text" id="courseName" name="courseName" placeholder="název" required></input>
                <label htmlFor="courseDescription">Popis kurzu</label>
                <input type="text" id="courseDescription" name="courseDescription" placeholder="popis"></input>
                <label htmlFor="coursePrice">Cena kurzu (Kč)</label>
                <input type="text" id="coursePrice" name="coursePrice" placeholder="cena" onKeyPress={e => onlyNumbers(e)}></input>
                <label htmlFor="courseLimit">Limit studentů *</label>
                <input type="text" id="courseLimit" name="courseLimit" placeholder="limit" onKeyPress={e => onlyNumbers(e)} required></input>

                <button type="submit">Založit kurz</button>
                {submited && <div>Kurz byl založen</div>}
            </form>
        </div>
    )
}
export default CreateCourse
 