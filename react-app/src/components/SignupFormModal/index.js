import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
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
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, firstName, lastName, city, state, profileImage, isClinician, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signUpModal">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul className="form-validation-errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<p>  
					<label>
						Username
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label> &nbsp;
					<label>
						Profile Image
						<input
							type="text"
							value={profileImage}
							onChange={(e) => setProfileImage(e.target.value)}
							required
						/>
					</label>&nbsp;
				</p>	
				<p>
					<label>
						First Name
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</label> &nbsp;
				
					<label>
						Last Name
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</label>&nbsp;
				</p>
				<p>				
					<label>
						City
						<input
							type="text"
							value={city}
							onChange={(e) => setCity(e.target.value)}
							required
						/>
					</label>&nbsp;
				
					<label>
						State
						<input
							type="text"
							value={state}
							onChange={(e) => setState(e.target.value)}
							required
						/>
					</label>&nbsp;
				</p>
				<p>
					
					<label>
						Email
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label> &nbsp;
				</p>
				<p>
					<label>
						<input
							className="signUpBox"
							type="checkbox"
							value={true}
							onChange={(e) => setIsClinician(e.target.value)}
						/>
						<span className="signUpText">SELECT if you are a licensed physical therapist.</span>
					</label>&nbsp;
				</p>
				<p>
					<label>
						Password
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label> &nbsp;
					<label>
						Confirm Password
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
				</p>
				<button className="signUpSubmitBtn" type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;