import { signInWithEmailAndPassword } from "../services/firebase";
import React, { useState } from "react";
import "../assets/css/login.css";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(loginEmail, loginPassword);
  };

  return (
    <div className="container">
      <div className="col-1">
        <div className="media">
          <img src={require("../assets/img/logo.jpg")} alt="logo" />
        </div>
        <div className="footer">
          <div className="footer-icons">
            <a href="https://www.instagram.com/dorsetcollegedublin/">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/dorsetcollege/">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="https://www.linkedin.com/school/dorset-college-dublin/">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCxLJ1AKUMuPvyhTWMH05q2Q">
              <i className="fa fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="col-2">
        <form className="form" onSubmit={handleSubmit}>
          <div className="signin">Sign In</div>
          <div className="email">
            <input className="input"
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <input className="input"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <div className="login">
            <button className="btn"
              variant="outline-success"
              type="submit"
              onClick={() => {
                signInWithEmailAndPassword(loginEmail, loginPassword);
              }}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
