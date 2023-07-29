import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import logoimg from "../Navigation/images/smallPTClogo.png"
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setEmail('demo@aa.io');
    setPassword('password');
  };

  return (
    <div className="login-root">
      <div className="login-container">
        <div className="login-inner">
          <img className='logoimg' src={logoimg} alt='logo' width={150} />
          {/* <h1 className="login-page-title">Log In</h1> */}
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label className="label-container">
              Email
              <input
                className="text-field"
                ype="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="label-container">
              Password
              <input
                className="text-field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button className="demoButton" onClick={handleDemoLogin}>Click to Fill Demo User Data</button>
            <button className="login-button2" type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
