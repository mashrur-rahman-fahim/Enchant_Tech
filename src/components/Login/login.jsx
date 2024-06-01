import React from "react";
import "./login.css";

export const Login1 = () => {
  
  return (
    <div>
      <div className="gap"></div>
      <div className="wrapper">
        <form action="#">
          <div className="login">
            <h1>Login</h1>
          </div>
          <div className="input1">
            <div>
              <ion-icon class="icon" name="mail"></ion-icon>
              <input
                type="Email"
                placeholder="Username"
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
                className="pass"
                id="lbl2"
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
              Do you hava an account? <a href="/SignUp">Sign up</a>
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};
