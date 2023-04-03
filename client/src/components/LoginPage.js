import { signInWithEmailAndPassword, registerWithEmailAndPassword } from "../services/firebase";
import React, { useState } from "react";
import "../assets/css/login.css";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const allowedDomains = ["@student.dorset-college.ie", "@faculty.dorset-college.ie", "@dorset.ie"];
    const emailDomain = email.substring(email.lastIndexOf("@"));
  
    if (!allowedDomains.includes(emailDomain)) {
      alert("Please use an email address with an allowed domain: \n\n@student.dorset-college.ie \n@faculty.dorset-college.ie \n@dorset.ie");
      return;
    }
  
    if (isSignUp) {
      await registerWithEmailAndPassword(email, password);
    } else {
      await signInWithEmailAndPassword(email, password);
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
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
          <div className="signin">{isSignUp ? "Sign Up" : "Sign In"}</div>
          {isSignUp && (
            <div className="name">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="email">
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="switch">
            <button className="text-button" type="button" onClick={toggleForm}>
              {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </button>
          </div>
          <div className="login">
            <button className="btn" variant="outline-success" type="submit">
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
