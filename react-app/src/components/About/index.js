import React from 'react';
import { NavLink } from 'react-router-dom';
import './About.css';
import aboutLogoimg from '../HomePage/images/PTwgreyBG.png'
import linkedInimg from './images/linkedIn.png'

const About = () => {
    return ( 
        <div className='aboutOuter'>
            <div className='aboutLogoimg'>
                <img className='aboutLogoimg' src={aboutLogoimg} alt='logo' width={150} />
            </div>
            <div  className='aboutInner'>
                <p className='aboutInfo'>PT Connect is a fullstack web application that was built 
                utilizing the following languages/frameworks/libraries: 
                JavaScript, Redux.js, Python, Flask, SQLAlchemy, React.js, HTML, and CSS.
                </p>
                <p className='aboutInfo'>PT Connect allows physical therapists to connect with their patients outside of the clinic.
                    This promotes communication between patient and physical therapist through messaging as well
                    as allows patients to view an online version of their exercise prescriptions with detailed
                    exercise guidelines and images to ensure proper technique and optimize recovery.
                </p>
                <p className='aboutInfo'>Ready to demo the site?
                &nbsp; Click &nbsp; <NavLink className='about-login-link' exact to='/' >HERE</NavLink>!</p>
                <div className='developerInfo'>
                Developed by:
                            <span>
                                <>Nenita Espinosa</>
                            </span> 
                            <a className='linkedIn' href='https://www.linkedin.com/in/nenitae/' target="_blank">
                                <img className='linkedIn' src={linkedInimg} alt='linkedIn'width="45" />
                            </a>
                            
                </div>
            </div>
        </div>  
    );
}
 
export default About;