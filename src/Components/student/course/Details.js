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