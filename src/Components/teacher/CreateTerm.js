import React,{useState, useEffect} from "react";
import axios from 'axios';
import "../../Styles/teacher/CreateTerm.css"
import { useParams } from "react-router";

const CreateTerm = (props)=>{
    const {id} = useParams();
    const clearId = id.replace(":", "");
    const handleSubmit=(e)=>{
        e.preventDefault();


        //console.log(clearId);

        axios.post("https://wis2back.herokuapp.com/terms",
        {
            term:{
                term_type: e.target.termType.value,
                date: e.target.termDate.value,
                time_start: e.target.termTimeStart.value,
                time_end: e.target.termTimeEnd.value,
                limit: e.target.termLimit.value,
                room: e.target.termRoom.value,

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

    }

    const onlyNumbers = (e)=>{
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
    }

    return(
        <div className="createTerm">
            <form className="createTerm" onSubmit={handleSubmit}>
                <input type="text" name="termType" placeholder="Typ termínu" required/>
                <input type="date" id="termDate" name="termDate" required></input>
                <input type="time" id="termTimeStart" name="termTimeStart" required></input>
                <input type="time" id="termTimeEnd" name="termTimeEnd" required></input>
                <input type="text" id="termLimit" name="termLimit" placeholder="limit" onKeyPress={e => onlyNumbers(e)}></input>
                <input type="text" id="termRoom" name="termRoom" placeholder="místnost" required></input>
                <button type="submit">Vytvořit termín</button>
            </form>
        </div>
    )
}

export default CreateTerm;