import react, {useState, useEffect} from "react";
import axios from "axios";
/*
const ListCourses = () => {

    const [courses, setCourses] = useState([]);

    const getCourses = async function() {
        const response = await axios.get("https://wis2back.herokuapp.com/courses",{headers:{'authorization': localStorage.getItem("token")},withCredentials:true})
        const data = response.data;
        console.log("ahoj", data);
        setCourses(data);
    }
    useEffect(() => {
        getCourses();
    }, [])



    

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Název</th>
                        <th>Popis</th>
                        <th>Cena</th>
                        <th>Kapacita</th>
                        <th>Termíny</th>
                        <th>Detail</th>
                        <th>Upravit</th>
                        <th>Smazat</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.name}</td>
                            <td>{course.description}</td>
                            <td>{course.price}</td>
                            <td>{course.count}/{course.limit}</td>
                            <td><button onClick={() => showTerms(course)}>Termíny</button></td>
                            <td><button onClick={() => showDetails(course)}>Podrobnosti</button></td>
                            <td><button onClick={() => updateCourse(course)}>Upravit</button></td>
                            <td><button onClick={() => deleteCourse(course.id)}>Smazat</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}
export default ListCourses*/