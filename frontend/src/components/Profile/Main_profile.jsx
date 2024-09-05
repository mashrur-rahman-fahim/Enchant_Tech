import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth1 } from '../Authentication/LoginContest';

export const Main_profile = () => {
  const { isLoggedIn1, setIsLoggedIn1 } = useAuth1();
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn1) {
      navigate('/Login');
      return;
    }

    axios.get('http://localhost:4000/auth', { withCredentials: true })
      .then((response) => {
        const data = response.data;
        if (data.valid) {
          console.log(data.email)
          setEmail(data.email); // Set the email from response
        } else {
          setIsLoggedIn1(false);
          navigate('/Login');
        }
      })
      .catch(err => {
        console.error(err);
        navigate('/Login');
      });
  }, [isLoggedIn1, navigate, setIsLoggedIn1]);

  return (
    <div>
      <h1>Main Profile</h1>
      {email ? <p>Logged in as: {email}</p> : <p>Loading...</p>}
    </div>
  );
};
