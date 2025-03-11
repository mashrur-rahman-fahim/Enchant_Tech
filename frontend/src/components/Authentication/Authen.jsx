// file: D:/web_app/Enchant_Tech/frontend/src/Authen.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useAuth1 } from "./LoginContest";

export const Authen = () => {
  const { email } = useParams();

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { isLoggedIn1, setIsLoggedIn1 } = useAuth1();

  useEffect(() => {
    fetch("https://enchant-tech-backend.onrender.com/auth", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          setMessage(data.message);
          if (isLoggedIn) navigate("/Admin");
          if (isLoggedIn1) navigate(`/`);
        } else {
          setMessage(data.message);
          setIsLoggedIn(false);
          setIsLoggedIn1(false);
          navigate("/Login");
        }
      })
      .catch((err) => console.error(err));
  }, [navigate, isLoggedIn, setIsLoggedIn]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};
