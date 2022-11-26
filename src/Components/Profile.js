import React,{useState, useEffect} from "react";
import axios from 'axios';
import "./../Styles/student/ProfileForm.css"

const Profile = (props)=>{
    const [name, setName]= useState(props.currUser.name);
    const [surname, setSurname]= useState(props.currUser.surname);
    const [email, setEmail]= useState(props.currUser.email);
    const [password, setPassword]= useState('');
    const [passwordDirty, setPasswordDirty]= useState(false);
    const [nameError, setNameError]= useState('');
    const [surnameError, setSurnameError]= useState('');
    const [emailError, setEmailError]= useState('');
    const [passwordError, setPasswordError]= useState('Password can`t be empty');
    const [formValid, setFormValid]= useState(false);
    const [formPasswordValid, setFormPasswordValid]= useState(false);

    useEffect(()=>{
        if(nameError||surnameError||emailError){
            setFormValid(false);
        }
        else{
            setFormValid(true);
        }
        if(passwordError){
            setFormPasswordValid(false);
        }
        else{setFormPasswordValid(true);}
    },[nameError,surnameError,emailError,passwordError]);

    const blurHandler = (e)=>{
        setPasswordDirty(true);
    }
    const nameHandler=(e)=>{
        setName(e.target.value);
        if(e.target.value.length<1){
            setNameError("Name can`t be empty");
        }
        else{
            setNameError("");
        }
    }

    const surnameHandler=(e)=>{
        setSurname(e.target.value);
        if(e.target.value.length<1){
            setSurnameError("Surname can`t be empty");
        }
        else{
            setSurnameError("");
        }
    }

    const emailHandler = (e)=>{
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(e.target.value.length<1){
            setEmailError("Email can`t be empty");
        }
        else if(!re.test(String(e.target.value).toLowerCase())){
            setEmailError("Incorrect email");
        }
        else{
            setEmailError("");
        }
    }

    const passwordHandler=(e)=>{
        setPassword(e.target.value)
        if(e.target.value.length<1){
            setPasswordError("Password can`t be empty");
        }
        else if(e.target.value.length< 4||e.target.value.length>10){
            setPasswordError("Might be longer than 3 and shorter than 10");
        }
        else{
            setPasswordError("");
            setPasswordDirty(false);
        }
    }

    const handleSubmit=(event)=>{
        console.log("submiterd");
        axios.put("https://wis2back.herokuapp.com/update",
            {
                user: {
                    name:               name,
                    surname:            surname,
                    email:              email
                }
            },
            {
                headers:{'authorization': localStorage.getItem("token")},
                withCredentials:true
            }
            )
            .then(response=>{
                console.log("registration res", response);
                if(response.status===200){
                    props.setCurrUser(response.data)
                }
            })
            .catch(error=>{
                console.log("registration error", error);
            })
        event.preventDefault();
    }

    const handlePasswordSubmit=(event)=>{
        axios.put("https://wis2back.herokuapp.com/passupdate",
            {
                user: {
                    password:   password
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
        event.preventDefault();
    }

    return(
    <div className="profile__content">
        <form onSubmit={handleSubmit}>
                <label>Name</label>
                {(nameError)&&<label style={{color:'red'}}>{nameError}</label>}
                <input 
                type="name"
                name="name"
                value = {name}
                onChange={e=>nameHandler(e)}
                required
                />
                <label>Surname</label>
                {(surnameError)&&<label style={{color:'red'}}>{surnameError}</label>}
                <input 
                type="surname"
                name="surname"
                value = {surname}
                onChange={e=>surnameHandler(e)}
                required
                />
                <label>Email</label>
                {(emailError)&&<label style={{color:'red'}}>{emailError}</label>}
                <input 
                type="email"
                name="email"
                value = {email}
                onChange={e=>emailHandler(e)}
                required
                />
                <div className='buttons'>
                    <button 
                    disabled={!formValid}
                    type="submit"
                    >Apply changes</button>
                </div>
                
            </form>
            <form onSubmit={handlePasswordSubmit}>
            <label>New password</label>
                {(passwordDirty&&passwordError)&&<label style={{color:'red'}}>{passwordError}</label>}
                <input 
                onBlur = {e=>blurHandler(e)}
                type="password"
                name="password"
                value = {password}
                onChange={e=>passwordHandler(e)}
                required
                />
                <div className='buttons'>
                    <button 
                    disabled={!formPasswordValid}
                    type="submit"
                    >Apply changes</button>
                </div>
            </form>
    </div>
    );
}
export default Profile