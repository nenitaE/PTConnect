import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="profileButtonContainer">
         <i className="fa-solid fa-user" onClick={openMenu} style={{color: "#200054"}}></i>
         {/* <i className="fa-solid fa-bars" style={{color: "#200054",}} /> */}
            <ul className={ulClassName} ref={ulRef}>
              {user ? (
                <>
                  <div className="profile-image-container">
                    <img src={user.profileImage} alt="profileImage" width="70" height="70" className="menu-profile-image"/>
                  
                    <div className="welcome-profile">
                      <div>
                        Welcome {user.isClinician && <>Dr. </>}{user.firstName}
                      </div>
                    </div>
                    <div className="profile-email">
                      {user.isClinician && <>Clinician Id: </>}{!user.isClinician && <>Patient Id: </>}{user.id}
                    </div>
                    <div className="profile-email">
                      {user.email}
                    </div>
                  </div>
                  <div className="lower-profile-container">
                  {user.isClinician && 
                    <div className="profile-link-container">
                      <li className="link-profileBttn">
                        <NavLink className='text-link-profileBttn' to="/patientLists/current">Patient List</NavLink>
                      </li>
                      <li>
                        <NavLink className='text-link-profileBttn' to="/exercises/current">Exercises</NavLink>
                      </li>
                    </div>
                  }

                  <li className="link-profileBttn">
                    <NavLink className='text-link-profileBttn' to="/messages/current">Messages</NavLink>
                  </li>
                  <li className="link-profileBttn">
                    <NavLink className='text-link-profileBttn' to="/exercisePrescriptions/current">Exercise Prescriptions</NavLink>
                  </li>
                  <div className="profile-logout-button-container">
                    <li>
                      <button className="profile-logout-button" onClick={handleLogout}>Log Out</button>
                    </li>
                  </div>
                </div>
                </>
              ) : (
                <>
                <div className="profile-login-logout-container">
                  <OpenModalButton
                    className="profile-login-logout-buttons"
                    buttonText="Log In"
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                  />

                  <OpenModalButton
                    className="profile-login-logout-buttons"
                    buttonText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                  />
                </div>
                </>
              )}
            </ul>
      </div>
    </>
  );
}

export default ProfileButton;
