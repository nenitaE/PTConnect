import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logoimg from './images/smallPTClogo.png'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navContainer'>
			<NavLink exact to="/" className="navLinkLogo">
					<img className='logoimg' src={logoimg} alt='logo' width={150} />
			</NavLink>	
			{/* <NavLink exact to="/signup">Signup</NavLink>
			<NavLink exact to="/login">Login</NavLink> */}
			{isLoaded && (
				<div className="navigation-menu">
					<div className="nav-row">
							<ul className='navUL'>
								{sessionUser && (
								<li className="navLi">
									<NavLink className='text-navBttn' to="/messages/current">Messages</NavLink>
								</li>)}
								{sessionUser && (<li className="navLi">
									<NavLink className='text-navBttn' to="/exercisePrescriptions/current">Exercise Prescriptions</NavLink>
								</li>)}
								<li className="profileButton">
									<ProfileButton user={sessionUser} />
								</li>
						</ul>
					</div>
				</div>
				
			)}
		</div>
	);
}

export default Navigation;