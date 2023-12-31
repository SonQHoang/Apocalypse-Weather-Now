import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const history = useHistory('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const loginDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  }
  return (
    <>
      <section className="logincontainer">
        <section className="logintitle">
      <h1>Log In</h1>
      </section>
      <section className="loginform">
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <section className="loginInput">
        <label className="logininputlabel">
          Email</label>
          <input
            className="loginInputField"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /></section>
        <section className="loginInput">
        <label className="logininputlabel">
          Password </label>
          <input
            className="loginInputField"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </section>
        <section className="loginSubmitContainer">
        <button id="loginsub" type="submit">Log In</button>
        </section>

      </form>
      </section>
      <button id="demousersub" className='demo-user' onClick={loginDemo}>Log In as Demo User</button>
      </section>
    </>
  );
}

export default LoginFormModal;
