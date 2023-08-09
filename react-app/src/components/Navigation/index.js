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
				<div  className="profileButton">
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;