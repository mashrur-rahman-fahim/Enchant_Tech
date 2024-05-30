import React from "react";
import "./login.css";

export const Login1 = () => {
  return (
    <div>
     
      <div className="gap"></div>
      <div class="wrapper">
        <form action="#">
          <div class="login">
            <h1>Login</h1>
          </div>
          <div class="input1">
            <div>
              <ion-icon class="icon" name="mail"></ion-icon>
              <input
                type="Email"
                placeholder="Username"
                class="email"
                id="lbl4"
                required
              />
            </div>
          </div>
          <div class="input1">
            <div>
              <ion-icon class="icon" name="lock-closed"></ion-icon>
              <input
                type="password"
                placeholder="Password"
                class="pass"
                id="lbl2"
              />
            </div>
          </div>
          <div class="remember">
            <input type="checkbox" />
            <label class="rmmbr">Remember me</label>
            <a href="#">Forgot Password?</a>
          </div>
          <div class="btn">
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


