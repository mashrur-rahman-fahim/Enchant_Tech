import React from "react";
import "./sign.css";
export const Sign = () => {
  return (
    <div>
      <div className="gap"></div>
      <div class="wrapper_sign">
        <form action="#">
          <div class="login">
            <h1>SignUp</h1>
          </div>
          <div class="input1">
            <div>
              <ion-icon class="icon" name="mail"></ion-icon>
              <input
                type="Email"
                placeholder="Name"
                class="email"
                id="lbl4"
                required
              />
            </div>
          </div>
          <div class="input1">
          <div>
            <ion-icon class="icon" name="mail"></ion-icon>
            <input
              type="Email"
              placeholder="Phone"
              class="email"
              id="lbl4"
              required
            />
          </div>
        </div>
          <div class="input1">
            <div>
              <ion-icon class="icon" name="mail"></ion-icon>
              <input
                type="Email"
                placeholder="Email"
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
         
          <div class="btn">
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
