import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams, Link } from "react-router-dom";
import "./LoginSignup.css"
import logoimg from "../../Navigation/images/smallPTClogo.png"



function LoginSignup() {

    
    return (
        <div className="login-signup-root">
            <div className="login-signup-container">
                <div className="login-signup-inner">
                <img className='logoimg' src={logoimg} alt='logo' width={150} />
			
                    {/* <div className="login-signup-title">PT Connect</div> */}
                    <Link to={"/signup"} >
                        <button className="signup-button">
                            Create An Account
                        </button>
                    </Link>
                    

                    <Link to={"/login"}>
                        <button className='login-button'>Log in</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup;