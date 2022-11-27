import React,{useState}  from 'react';
import Sidebar from './Sidebar';
import Modal from './modal/Modal'
import Registration from './auth/Registration';
import SignIn from './auth/SignIn';
import "../Styles/Home.css"
import "../Styles/App.css"

const Home =(props)=>{
    const[signInModalActive, setSignInModalActive] = useState(false);
    const[registrateModalActive, setRegistrateModalActive] = useState(false);

    return (
        <div className='content__wrapper'>
            <Sidebar>
                <button className='open-btn' onClick={()=>setSignInModalActive(true)}>Přihlásit</button>
                <button className='open-btn' onClick={()=>setRegistrateModalActive(true)}>Registrovat</button>
            </Sidebar>
            <div>
                <Modal active={signInModalActive} setActive={setSignInModalActive}>
                    <SignIn currUser={props.currUser} setCurrUser={props.setCurrUser}></SignIn>
                </Modal>
                <Modal active={registrateModalActive} setActive={setRegistrateModalActive}>
                    <Registration setCurrUser={props.setCurrUser}></Registration>
                </Modal>
            </div>
        </div>
    );
}
export default Home