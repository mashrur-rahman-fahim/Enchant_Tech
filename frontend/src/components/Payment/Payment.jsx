import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useAuth1 } from '../Authentication/LoginContest';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const Payment = () => {
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
        <h1>amkeo kichu taka bkash kor

        </h1>

    </div>
  )
}
