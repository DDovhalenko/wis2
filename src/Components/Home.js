import React,{useState}  from 'react';
import Sidebar from './Sidebar';
import Modal from './modal/Modal'
import Registration from './auth/Registration';
import SignIn from './auth/SignIn';
import { useNavigate } from 'react-router';
import "../Styles/Home.css"
import "../Styles/App.css"

const Home =(props)=>{
    const[signInModalActive, setSignInModalActive] = useState(false);
    const[registrateModalActive, setRegistrateModalActive] = useState(false);
    return (
        <div className='content'>
            <Sidebar>
                <button className='open-btn' onClick={()=>setSignInModalActive(true)}>Sign in</button>
                <button className='open-btn' onClick={()=>setRegistrateModalActive(true)}>Registrate</button>
            </Sidebar>
            <div>
                <h1>Home</h1>
                <Modal active={signInModalActive} setActive={setSignInModalActive}>
                    <SignIn user={props.user} history={useNavigate()}></SignIn>
                </Modal>
                <Modal active={registrateModalActive} setActive={setRegistrateModalActive}>
                    <Registration user={props.user} history={useNavigate()}></Registration>
                </Modal>
            </div>
        </div>
    );
}
export default Home