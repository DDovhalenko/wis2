//Author : Roman Vintoňak xvinto00

import { useEffect , useState} from "react"
import axios from "axios"
import Modal from "./modal/Modal"
import Details from "./Details"


const ListCourses = () =>{

    const [courses, setCourses] = useState([])
    const [showDetailsActive, setShowDetailsActive] = useState(false)
    const [curCourse, setCurCourse] = useState(null)

    const getCourses = async function(){
        const response = await axios.get("https://wis2back.herokuapp.com/showcourses")
        const data = response.data;
        setCourses(data);
    }

    useEffect(() => {
        getCourses();
    }, [])

    const showDetails = (props) =>{
        setCurCourse(props)
        setShowDetailsActive(true)
    }


    return(
<div className="Content">
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
                            <td>{course.limit}</td>
                            <td><button onClick={() => showDetails(course)}>Podrobnosti</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal active={showDetailsActive} setActive={setShowDetailsActive}>
                <Details course={curCourse}></Details>
            </Modal>
        </div>
    )
}
export default ListCourses