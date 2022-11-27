import "../../../styles.css"

const Details = (props) => {
    if(props.course == null){
        return;
    }
    return(
        <div>
            <h2>{props.course.name}</h2>
            <p>Cena: {props.course.price}</p>
            <p>Kapacita: {props.course.count}/{props.course.limit}</p>
            <p>Popis: {props.course.description}</p>
        </div>
    )
}
export default Details