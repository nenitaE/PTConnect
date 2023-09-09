import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom'
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  // if (!userIsClinician) {
  //   return (
  //       <h1>Loading...</h1>
  //   )
  // }
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = await dispatch(login(email, password));
  //   if (data) {
  //     setErrors(data);
  //   } else if (userIsClinician){
  //       closeModal();
  //       <Redirect to="/" />;
  //   } else if (!userIsClinician){
  //       <Redirect to="/patients" />;
  //   }
  // };

  const handleDemoClinicianLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  };
  const handleDemoPatientLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('marnie@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <h1 className="login-modal-title">Log In</h1>
      <form onSubmit={handleSubmit} className="login-form-modal">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="login-modal-button">
          Email 
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="login-modal-button">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="login-modal-button" type="submit">Log In</button>
        <button className="login-modal-button" onClick={handleDemoClinicianLogin}>Login as Demo Therapist</button>
        <button className="login-modal-button" onClick={handleDemoPatientLogin}>Login as Demo Patient</button>
        
      </form>
    </>
  );
}

export default LoginFormModal;
