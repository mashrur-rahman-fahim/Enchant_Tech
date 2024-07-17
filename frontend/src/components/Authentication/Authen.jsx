// file: D:/web_app/Enchant_Tech/frontend/src/Authen.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const Authen = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    fetch("http://localhost:4000/auth", {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setMessage(data.message);
          if (isLoggedIn) navigate('/Admin');
        } else {
          setMessage(data.message);
          setIsLoggedIn(false);
          navigate('/Login');
        }
      })
      .catch(err => console.error(err));
  }, [navigate, isLoggedIn, setIsLoggedIn]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};
