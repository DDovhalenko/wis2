//Author : Ivo Prochazka xproch0h

import React ,{ useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const SignIn =(props)=>{
    const history = useNavigate();
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [emailDirty, setEmailDirty]= useState(false);
    const [passwordDirty, setPasswordDirty]= useState(false);
    const [emailError, setEmailError]= useState("Email can't be empty");
    const [passwordError, setPasswordError]= useState("Password can't be empty");
    const [error, setError] = useState(false)

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
            setEmailError("Email can't be empty");
        }
        else{
            setEmailError("");
        }
    }

    const passwordHandler=(e)=>{
        setPassword(e.target.value);
        if(e.target.value.length<1){
            setPasswordError("Password can't be empty");
        }
        else{
            setPasswordError("");
        }
    }

    const handleSubmit=(event)=>{
        //console.log("submited");
        axios.post("https://wis2back.herokuapp.com/login",
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
                    localStorage.setItem("token", response.data.token);
                    props.setCurrUser(response.data.user);
                    //console.log(props.currUser)
                    
                    if(response.data.user.role==="teacher"){
                        history("/teacher");
                    }
                    else if(response.data.user.role==="student"){
                        history("/student");
                    }
                    else if(response.data.user.role==="admin"){
                        history("/admin");
                    }
                }
                console.log("registration res", response);
            })
            .catch(error=>{
                setError(true)
            })

        event.preventDefault();
    }

    return(
        <div>
            <h1>Přihlášení</h1>
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
                <label>Heslo</label>
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
                    >Přihlásit</button>
                </div>
            </form>
            {error && <h2 style={{"text-align": "center", "font-size":"xx-large", "color":"red"}}>Email a heslo se neshodují!</h2>}
        </div>
    )
}
export default SignIn