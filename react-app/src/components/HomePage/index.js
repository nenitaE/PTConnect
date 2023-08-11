import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from "react";
import { useHistory, Redirect, NavLink } from 'react-router-dom';
import circleimg from "./images/PTwgreyBG.png"
import './HomePage.css'

const HomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const[userIsPatient, setUserIsPatient] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!sessionUser) {
            history.push('/');
        } else if (sessionUser.isClinician === false){
            setUserIsPatient(true)
            history.push('/patient');  
        } else {
            history.push('/');
        }
    }, [dispatch, sessionUser, history])

    if (userIsPatient === true) {
       history.push('/patient');
    }
    if (sessionUser?.isClinician) {
        history.push('/');
    }

    
    console.log("🚀 ~ file: index.js:16 ~ HomePage ~ userIsPatient:", userIsPatient)


    return ( 
        <div className="HomeContainer">
            <div className="background">
                <div className="HomeWelcome">Welcome to PT Connect </div>
                <img className='circleimg' src={circleimg} alt='logo' width={150} />
                <div className='HomeDescription'>
                    <p>Connecting Physical Therapists</p> 
                    <p>With Their Patients</p>
                </div>
                <div className="login-signup-nav-container">
                    {!sessionUser && <NavLink className='Login-Signup-NavLink' exact to="/loginSignup">Get Connected Now!</NavLink>}
                </div>
                </div>
                
        </div>
     );
}
 
export default HomePage;