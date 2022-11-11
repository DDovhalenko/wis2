import React ,{ useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const SignIn =(props)=>{
    const history = useNavigate();
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
        axios.post("http://localhost:3001/login",
            {
                user: {
                    email: email,
                    password:password
                }
                
            },
            {withCredentials:true}
            )
            .then(response=>{
                if(response.status===200){
                    localStorage.setItem("token", response.headers.get("Authorization").replace('Bearer ',''));
                    props.setCurrUser(response.data);
                    console.log(props.currUser)
                    history("/dashboard");
                }
                console.log("registration res", response);
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
                    type="submit"
                    >Log in</button>
                </div>
            </form>
        </div>
    )
}
export default SignIn