import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth1 } from '../Authentication/LoginContest';

export const Main_profile = () => {
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
    <div>Main_profile</div>
  )
}
