import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth1 } from '../Authentication/LoginContest'
import axios from 'axios'

export const Profile = () => {
  const { email } = useParams();
  
  const { isLoggedIn1, setIsLoggedIn1 } = useAuth1();
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  console.log(isLoggedIn1)
useEffect(()=>{
  fetch("http://localhost:4000/auth",{credentials:'include'})
  .then((res)=>res.json())
  .then((data)=>{
    if(!data.valid)
    {
      setIsLoggedIn1(false);
      navigate('/Login')

    }
  })
},[navigate,setIsLoggedIn1])

  



  return (
    <div>
      <h1>Welcome, {email}</h1>
    </div>
    
  );
};
