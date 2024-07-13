import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import { useAuth } from "../Authentication/AuthContext";

export const Login1 = () => {
  const [formData, setFormdata] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  axios.defaults.withCredentials = true;
  const email_admin = process.env.email_admin;
  const password_admin = process.env.password_admin;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/login', formData)
      .then((response) => {
        const data = response.data;
        if (data.Login) {
          console.log(data.email)
          if (formData.email ==="admin@gmail.com" && formData.password === "admin") {
          
            setIsLoggedIn(true);
          }
          navigate('/Auth');
          alert("Login successful!");
        } else {
          alert("Login failed!");
        }
      })
      .catch(err => {
        console.error(err);
        alert("An error occurred during login.");
      });
  };

  return (
    <div>
      <div className="gap"></div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="login">
            <h1>Login</h1>
          </div>
          <div className="input1">
            <div>
              <ion-icon class="icon" name="mail"></ion-icon>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="email"
                id="lbl4"
                required
              />
            </div>
          </div>
          <div className="input1">
            <div>
              <ion-icon class="icon" name="lock-closed"></ion-icon>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="pass"
                id="lbl2"
                required
              />
            </div>
          </div>
          <div className="remember">
            <input type="checkbox" />
            <label className="rmmbr">Remember me</label>
            <a href="#">Forgot Password?</a>
          </div>
          <div className="btn">
            <button type="submit">Login</button>
          </div>
          <div className="signup">
            <h2>
              Do you have an account? <Link to="/SignUp">Sign up</Link>
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};
