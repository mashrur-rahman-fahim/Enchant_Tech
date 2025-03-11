import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../Authentication/AuthContext";
import { useAuth1 } from "../Authentication/LoginContest";

export const Login1 = () => {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {isLoggedIn, setIsLoggedIn } = useAuth();
  axios.defaults.withCredentials = true;
  const email_admin = process.env.email_admin;
  const password_admin = process.env.password_admin;
  const { isLoggedIn1,setIsLoggedIn1 } = useAuth1();

  useEffect(() => {
    // Assuming you have an API route or state check for the user's logged-in status
    if(isLoggedIn || isLoggedIn1){
      navigate('/');
    }
  }, [navigate,isLoggedIn,isLoggedIn1]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://enchant-tech-backend.onrender.com/login", formData)
      .then((response) => {
        const data = response.data;
        if (data.Login) {
          if (
            formData.email === "admin@gmail.com" &&
            formData.password === "admin"
          ) {
            toast.success("Login as an Admin", {
              autoClose: 2000, // Automatically close after 5 seconds
            });
            
            setTimeout(()=>{
              setIsLoggedIn(true);
              navigate(`/Auth/${formData.email}`);
            },2000)
           
          } else if (setIsLoggedIn1) {
            setIsLoggedIn1(true);
            toast.success("Login successful!", {
              autoClose: 2000, // Automatically close after 5 seconds
            });
            setTimeout(()=>{
              navigate(`/Auth/${formData.email}`);
            },2000)
           
           
          } else
            toast.error("Login failed!", {
              autoClose: 2000,
            });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred during login.", {
          autoClose: 2000,
        });
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
          {/* <div className="remember">
            <input type="checkbox" />
            <label className="rmmbr">Remember me</label>
            <a href="#">Forgot Password?</a>
          </div> */}
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
      <ToastContainer />
    </div>
  );
};
