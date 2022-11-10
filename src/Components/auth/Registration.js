import React ,{useEffect, useState} from 'react';
import axios from 'axios';

const Registration =(props)=>{
    let responseText="";
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [emailDirty, setEmailDirty]= useState(false);
    const [passwordDirty, setPasswordDirty]= useState(false);
    const [emailError, setEmailError]= useState('Email can`t be empty');
    const [passwordError, setPasswordError]= useState('Password can`t be empty');
    const [formValid, setFormValid]= useState(false);

    useEffect(()=>{
        if(emailError||passwordError){
            setFormValid(false);
        }
        else{
            setFormValid(true);
        }
    },[emailError,passwordError]);

    const blurHandler = (e)=>{
        switch(e.target.name){
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

    const emailHandler = (e)=>{
        setEmail(e.target.value)
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
        else if(e.target.value.length< 3||e.target.value.length>10){
            setPasswordError("Password might be longer than 3 and shorter than 10");
        }
        else{
            setPasswordError("");
            setPasswordDirty(false);
        }
    }

    const handleSubmit=(event)=>{
        console.log("submiterd");
        axios.post("http://localhost:3001/users",
            {
                user: {
                    email: email,
                    password:password
                }
                
            },
            {withCredentials:true}
            )
            .then(response=>{
                console.log("registration res", response.data);
                if(response.data.status === "created"){
                    props.history("/dashboard");
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
                {(emailDirty&&emailError)&&<div style={{color:'red'}}>{emailError}</div>}
                <label for="email">Email</label>
                <input 
                onBlur = {e=>blurHandler(e)}
                type="email"
                name="email"
                value = {email}
                onChange={e=>emailHandler(e)}
                required
                />
                {(passwordDirty&&passwordError)&&<div style={{color:'red'}}>{passwordError}</div>}
                <label for="password">Password</label>
                <input 
                onBlur = {e=>blurHandler(e)}
                type="password"
                name="password"
                value = {password}
                onChange={e=>passwordHandler(e)}
                required
                />
                <button 
                disabled={!formValid}
                type="submit"
                >Registrate</button>
            </form>
            <button 
            onClick={deleteHandle}
            >Log out</button>
        </div>
    )
}
export default Registration