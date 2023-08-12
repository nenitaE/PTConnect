import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import logoimg from '../Navigation/images/smallPTClogo.png'

function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [profileImage, setProfileImage] = useState("");
	const [isClinician, setIsClinician] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
  	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, firstName, lastName, city, state, profileImage, isClinician, password));
			if (data) {
			setErrors(data)
			}
		} else {
			setErrors(['Confirm Password field must be the same as the Password field']);
		}
	};

	return (
		<div className="signup-root">
        	<div className="signup-container">
           		<div className="signup-inner">
                	<div className="signup-title">

					<img className='logoimg' src={logoimg} alt='logo' width={150} />
					</div>
						<form className="signup-form" onSubmit={handleSubmit}>
								<ul className="form-validation-errors">
									{errors.map((error, idx) => (
										<li key={idx}>{error}</li>
									))}
								</ul>
									<span className="row-signup">
										<label>
											Username
											<input
												className="signup-input"
												type="text"
												value={username}
												onChange={(e) => setUsername(e.target.value)}
												required
											/>
										</label>
										<label>
											Email
											<input
												className="signup-input"
												type="text"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												required
											/>
										</label>
									</span>	
									<span className="row-signup">
										<label>
											First Name
											<input
												className="signup-input"
												type="text"
												value={firstName}
												onChange={(e) => setFirstName(e.target.value)}
												required
											/>
										</label>
										<label>
											Last Name
											<input
												className="signup-input"
												type="text"
												value={lastName}
												onChange={(e) => setLastName(e.target.value)}
												required
											/>
										</label>
									</span>
									<label>
										City
										<input
											className="signup-input"
											type="text"
											value={city}
											onChange={(e) => setCity(e.target.value)}
											required
										/>
									</label>
									<label>
										State
										<input
											className="signup-input"
											type="text"
											value={state}
											onChange={(e) => setState(e.target.value)}
											required
										/>
									</label>
									<label>
										Profile Image Link
										<input
											className="signup-input"
											type="text"
											value={profileImage}
											onChange={(e) => setProfileImage(e.target.value)}
											required
										/>
									</label>
									<span className="signup-isClinician">
										<input
											className="signup-input"
											type="checkbox"
											value={true}
											onChange={(e) => setIsClinician(e.target.value)}
										/>
										SELECT if you are a licensed physical therapist
									</span>
									<label>
										Password
										<input
											className="signup-input"
											type="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
									</label>
									<label>
										Confirm Password
										<input
											className="signup-input"
											type="password"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											required
										/>
									</label>
								<button className="signup-form-button" type="submit">Create My Account</button>
								<div className="agreement-section">
                        			By signing up, I agree that site use is for educational purposes only.
                    			</div>
							</form>
				</div>
			</div>
		</div>
	);
}

export default SignupFormPage;
