import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

export const Login1 = () => {
  const [formData,setFormdata]=useState({
    email:"",
    password:""
  })
  const handlechange=(e)=>{

      const {name,value}=e.target;
      setFormdata({...formData,[name]:value});

  }
  const submission=(e)=>{
    e.preventDefault();
    fetch('http://localhost:4000/login',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formData)

    }).then((response)=>response.json())
    // fetch('http://localhost:4000/login')
    // .then(response=>response.json())
    // .then((data)=>{
       
    //     const findEmail=data.find((usr)=>usr.email===formData.email )
    //    const matchPass=data.find((usr)=> usr.password===formData.password)
    //      if(findEmail && matchPass)
    //       {
    //         alert("Account  exist! ");
    //         return ;
    //       }

    //       else
    //       {
    //         alert("Wrong credential")
    //         return;
    //       }




    // })


  }
  
  return (
    <div>
      <div className="gap"></div>
      <div className="wrapper">
        <form onSubmit={submission}>
          <div className="login">
            <h1>Login</h1>
          </div>
          <div className="input1">
            <div>
              <ion-icon class="icon" name="mail"></ion-icon>
              <input
                type="Email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handlechange}
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
                onChange={handlechange}
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
              Do you hava an account? <Link to="/SignUp">Sign up</Link>
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};
