import React ,{useEffect, useState} from 'react';
import axios from 'axios';

const Registration =(props)=>{
    let responseText="";
    const [name, setName]= useState('');
    const [surname, setSurname]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [nameDirty, setNameDirty]= useState(false);
    const [surnameDirty, setSurnameDirty]= useState(false);
    const [emailDirty, setEmailDirty]= useState(false);
    const [passwordDirty, setPasswordDirty]= useState(false);
    const [nameError, setNameError]= useState('Name can`t be empty');
    const [surnameError, setSurnameError]= useState('Surname can`t be empty');
    const [emailError, setEmailError]= useState('Email can`t be empty');
    const [passwordError, setPasswordError]= useState('Password can`t be empty');
    const [formValid, setFormValid]= useState(false);

    useEffect(()=>{
        if(nameError||surnameError||emailError||passwordError){
            setFormValid(false);
        }
        else{
            setFormValid(true);
        }
    },[nameError,surnameError,emailError,passwordError]);

    const blurHandler = (e)=>{
        switch(e.target.name){
            case 'name':
                setNameDirty(true);
                break;
                case 'surname':
                setSurnameDirty(true);
                break;
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
            default:
                break;
        }
    }

    
    const nameHandler=(e)=>{
        setName(e.target.value);
        if(e.target.value.length<1){
            setNameError("Name can`t be empty");
        }
        else{
            setNameError("");
            setNameDirty(false);
        }
    }

    const surnameHandler=(e)=>{
        setSurname(e.target.value);
        if(e.target.value.length<1){
            setSurnameError("Surname can`t be empty");
        }
        else{
            setSurnameError("");
            setSurnameDirty(false);
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
            setEmailDirty(false);
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
        axios.post("http://localhost:3001/signup",
            {
                user: {
                    name:       name,
                    surname:    surname,
                    email:      email,
                    password:   password
                }
                
            },
            {withCredentials:true}
            )
            .then(response=>{
                console.log("registration res", response);
                if(response.status===200){
                    localStorage.setItem('token', response.headers.get("Authorization").replace('Bearer ',''));
                    props.setCurrUser(response.data)
                }
            })
            .catch(error=>{
                console.log("registration error", error);
            })

        event.preventDefault();
    }


    const deleteHandle=(event)=>{
        axios.get("http://localhost:3001/users/sign_up",
            {
                
            },
            {withCredentials:true}
            )
            .then(response=>{
                responseText=JSON.stringify(response.data)
                console.log("registration res", response.data);
            })
            .catch(error=>{
                console.log("registration error", error);
            })

        event.preventDefault();
    }

    return(
        <div>
            <div>{responseText}</div>
            <form onSubmit={handleSubmit}>
                <h1>Registration</h1>
                <label>Name</label>
                {(nameDirty&&nameError)&&<label style={{color:'red'}}>{nameError}</label>}
                <input 
                onBlur = {e=>blurHandler(e)}
                type="name"
                name="name"
                value = {name}
                onChange={e=>nameHandler(e)}
                required
                />
                <label>Surname</label>
                {(surnameDirty&&surnameError)&&<label style={{color:'red'}}>{surnameError}</label>}
                <input 
                onBlur = {e=>blurHandler(e)}
                type="surname"
                name="surname"
                value = {surname}
                onChange={e=>surnameHandler(e)}
                required
                />
                <label>Email</label>
                {(emailDirty&&emailError)&&<label style={{color:'red'}}>{emailError}</label>}
                <input 
                onBlur = {e=>blurHandler(e)}
                type="email"
                name="email"
                value = {email}
                onChange={e=>emailHandler(e)}
                required
                />
                <label>Password</label>
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
                    disabled={!formValid}
                    type="submit"
                    >Registrate</button>

                    <button 
                    onClick={deleteHandle}
                    >Log out</button>
                </div>
                
            </form>
        </div>
    )
}
export default Registration