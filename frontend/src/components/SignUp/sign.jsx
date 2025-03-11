import React, { useState } from "react";
import "./sign.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Sign = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://enchant-tech-backend.onrender.com/signUp")
      .then((response) => response.json())
      .then((data) => {
        const findEmail = data.find((usr) => usr.email === formdata.email);
        if (findEmail) {
          toast.error("User already exist, please login", {
            autoClose: 2000,
          });
          return;
        }
        fetch("https://enchant-tech-backend.onrender.com/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        })
          .then((response) => response.json())
          .then(() =>
            toast.success("User created!", {
              autoClose: 2000,
            })
          );
      });
  };

  return (
    <div>
      <div className="gap"></div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="login">
            <h1>SignUp</h1>
          </div>
          <div className="input1">
            <div>
              <ion-icon class="icon" name="person-outline"></ion-icon>
              <input
                type="text"
                placeholder="Name"
                className="email"
                name="name"
                onChange={handlechange}
                value={formdata.name}
                id="nameInput"
                required
              />
            </div>
          </div>
          <div className="input1">
            <div>
              <ion-icon class="icon" name="mail-outline"></ion-icon>
              <input
                type="email"
                placeholder="Email"
                className="email"
                name="email"
                onChange={handlechange}
                value={formdata.email}
                id="emailInput"
                required
              />
            </div>
          </div>
          <div className="input1">
            <div>
              <ion-icon class="icon" name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                placeholder="Password"
                className="pass"
                name="password"
                onChange={handlechange}
                value={formdata.password}
                id="passwordInput"
                required
              />
            </div>
          </div>
          <div className="btn">
            <button type="submit">SignUp</button>
          </div>
          <div className="signup">
            <h2>
              Already have an account? <Link to="/Login">Login</Link>
            </h2>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
