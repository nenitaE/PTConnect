import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import circleimg from "./images/PTwgreyBG.png"
import './HomePage.css'

const HomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    


    return ( 
        <div className="HomeContainer">
            <div className="background">
                <div className="HomeWelcome">Welcome to PT Connect </div>
                <img className='circleimg' src={circleimg} alt='logo' width={150} />
                <div className='HomeDescription'>
                    <p>Connecting Physical Therapists</p> 
                    <p>With Their Patients</p>
                </div>
                {!sessionUser && <NavLink className='Login-Signup-NavLink' exact to="/loginSignup">Get Connected Now!</NavLink>}

            </div>
        </div>
     );
}
 
export default HomePage;