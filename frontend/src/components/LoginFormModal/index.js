import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const history = useHistory('')

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleClose = () => {
    closeModal();
  };

  const loginDemo = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ credential: 'Demo', password: 'Demodemo' }))
    .then(closeModal)
    history.push('/')
  }

  let buttonDisable = false;
  if(credential.length < 4 || password.length < 6) {
    buttonDisable = true
  }

  return (
    <div className="login-form-container">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <h1 className="login-form-title">Log In</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            className="login-input"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p className="login-error">{errors.credential}</p>
        )}
        <button className='login-button'type="submit" disabled={buttonDisable}>Log In</button>
      </form>
        <button className='demo-user' onClick={loginDemo}>Log In as Demo User</button>
    </div>
  );
}

export default LoginFormModal;
