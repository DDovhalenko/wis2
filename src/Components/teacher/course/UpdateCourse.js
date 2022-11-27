import axios from "axios";
import { useEffect, useState } from "react";


const UpdateCourse = (props) => {
    const [submited, setSubmited] = useState(false)


    if(props.course == null){
        return;
    }
    const handleSubmit = async function(e){

        e.preventDefault();

        setSubmited(true)


        const response = await axios.put("https://wis2back.herokuapp.com/courses", {
            course:{
                id: props.course.id,
                name: e.target.courseName.value,
                description: e.target.courseDescription.value,
                price: e.target.coursePrice.value,
                limit: e.target.courseLimit.value,
            }
        },
        {
            headers:{'authorization': localStorage.getItem("token")},
            withCredentials:true
        }
        )
        props.setModalActive(false);
        props.update();
    }



    const onlyNumbers = (e)=>{
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
    }


    return(
        <div className="createCourse">
            <form className="createCourseForm" onSubmit={handleSubmit} key={props.course.id}>
                <label htmlFor="courseName">Název kurzu *</label>
                <input type="text" id="courseName" name="courseName" placeholder="název" required defaultValue={props.course.name}></input>
                <label htmlFor="courseDescription">Popis kurzu</label>
                <input type="text" id="courseDescription" name="courseDescription" placeholder="popis" defaultValue={props.course.description}></input>
                <label htmlFor="coursePrice">Cena kurzu (Kč)</label>
                <input type="text" id="coursePrice" name="coursePrice" placeholder="cena" onKeyPress={e => onlyNumbers(e)} defaultValue={props.course.price}></input>
                <label htmlFor="courseLimit">Limit studentů</label>
                <input type="text" id="courseLimit" name="courseLimit" placeholder="limit" onKeyPress={e => onlyNumbers(e)} defaultValue={props.course.limit} defa></input>
                <button type="submit">Upravit kurz</button>
                {submited && <div>Kurz byl upraven</div>}
            </form>
        </div>
    )
}
export default UpdateCourse