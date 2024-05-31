import React from "react";
import "./sign.css";
export const Sign = () => {
  return (
    <div>
      <div className="gap"></div>
      <div className="wrapper_sign">
        <form action="#">
          <div className="login">
            <h1>SignUp</h1>
          </div>
          <div className="input1">
            <div>
              <ion-icon className="icon" name="mail"></ion-icon>
              <input
                type="Email"
                placeholder="Name"
                className="email"
                id="lbl4"
                required
              />
            </div>
          </div>
          <div className="input1">
          <div>
            <ion-icon className="icon" name="mail"></ion-icon>
            <input
              type="Email"
              placeholder="Phone"
              className="email"
              id="lbl4"
              required
            />
          </div>
        </div>
          <div className="input1">
            <div>
              <ion-icon className="icon" name="mail"></ion-icon>
              <input
                type="Email"
                placeholder="Email"
                className="email"
                id="lbl4"
                required
              />
            </div>
          </div>
          <div className="input1">
            <div>
              <ion-icon className="icon" name="lock-closed"></ion-icon>
              <input
                type="password"
                placeholder="Password"
                className="pass"
                id="lbl2"
              />
            </div>
          </div>
         
          <div className="btn">
            <button type="submit">SignUp</button>
          </div>
          <div className="signup">
            <h2>
              Already have an account? <a href="/Login">Login</a>
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};
