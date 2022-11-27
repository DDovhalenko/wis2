import React,{useState}  from 'react';
import Sidebar from './Sidebar';
import Modal from './modal/Modal'
import Registration from './auth/Registration';
import SignIn from './auth/SignIn';
import "../Styles/Home.css"
import "../Styles/App.css"
import ListCourses from './ListCourses';


const Home =(props)=>{
    const [signInModalActive, setSignInModalActive] = useState(false);
    const [registrateModalActive, setRegistrateModalActive] = useState(false);
    const [showCourses, setShowCourses] = useState(false)

    


    return (
        <div className='content__wrapper'>
            <Sidebar>
                <button className='open-btn' onClick={()=>setSignInModalActive(true)}>Přihlásit</button>
                <button className='open-btn' onClick={()=>setRegistrateModalActive(true)}>Registrovat</button>
                <button className='open-btn' onClick={()=>setShowCourses(true)}>Prohlížet kurzy</button>
            </Sidebar>
            <div>
                <Modal active={signInModalActive} setActive={setSignInModalActive}>
                    <SignIn currUser={props.currUser} setCurrUser={props.setCurrUser}></SignIn>
                </Modal>
                <Modal active={registrateModalActive} setActive={setRegistrateModalActive}>
                    <Registration setCurrUser={props.setCurrUser}></Registration>
                </Modal>
                {showCourses && <ListCourses></ListCourses>}
            </div>
        </div>
    );
}
export default Home