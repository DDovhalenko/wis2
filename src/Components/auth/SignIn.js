import React ,{ useState} from 'react';
import axios from 'axios';

const SignIn =(props)=>{
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [emailDirty, setEmailDirty]= useState(false);
    const [passwordDirty, setPasswordDirty]= useState(false);
    const [emailError, setEmailError]= useState('Email can`t be empty');
    const [passwordError, setPasswordError]= useState('Password can`t be empty');

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
        setEmail(e.target.value);
        if(e.target.value.length<1){
            setEmailError("Email can`t be empty");
        }
        else{
            setEmailError("");
        }
    }

    const passwordHandler=(e)=>{
        setPassword(e.target.value);
        if(e.target.value.length<1){
            setPasswordError("Password can`t be empty");
        }
        else{
            setPasswordError("");
        }
    }

    const handleSubmit=(event)=>{
        console.log("submiterd");
        axios.post("http://localhost:3001/users/sign_in",
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

    return(
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
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
                type="submit"
                >Log in</button>
            </form>
        </div>
    )
}
export default SignIn